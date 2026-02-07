/**
 * Hover Time Estimator
 *
 * Simplified physics model that maps interview question parameter choices
 * to an estimated hover time for a quadcopter of the selected size.
 *
 * Model:
 *   totalWeight = frame + 4×motor + 4×prop + ESC + FC + battery
 *   batteryEnergy (Wh) = energyDensity × batteryWeight / 1000
 *   combinedEfficiency = motorEff × geoMult × bladeEff × pitchEff × profileEff × matEff
 *   powerDraw (W) = totalWeight / (baseGPerW × effFactor)
 *   hoverTime (min) = (batteryEnergy × 0.8) / powerDraw × 60
 */

import { getDroneSize } from '../data/droneSizes';
import { getQuestionsForSize } from '../data/interviewQuestions';

/**
 * Estimate hover time from the user's parameter selections.
 *
 * @param {Object} answers - Map of questionId → selected optionId
 * @param {string} sizeId - Drone size ('5', '7', '10', '13')
 * @returns {Object} { hoverTimeMinutes, totalWeight, batteryEnergy, powerDraw, efficiency }
 */
export function estimateHoverTime(answers, sizeId = '10') {
  const sizeConfig = getDroneSize(sizeId);
  const { basePropWeight, fixedEscWeight, fixedFcWeight, baseGPerWatt } =
    sizeConfig.estimator;
  const questions = getQuestionsForSize(sizeId);
  const params = resolveParameters(answers, sizeConfig, questions);

  // ── Weight ──
  const motorWeight = params.motorWeightG * 4;
  const propWeight = basePropWeight * params.matWeightMult * 4;
  const totalWeight =
    params.frameWeightG +
    motorWeight +
    propWeight +
    fixedEscWeight +
    fixedFcWeight +
    params.batteryWeightG;

  // ── Battery Energy ──
  const batteryEnergyWh = (params.energyDensityWhKg * params.batteryWeightG) / 1000;
  const usableEnergy = batteryEnergyWh * 0.8; // 80% usable capacity

  // ── Efficiency ──
  const combinedEfficiency =
    params.motorEffAtHover *
    params.geoEffMult *
    params.bladeEffMult *
    params.pitchEffMult *
    params.profileEffMult *
    params.matEffMult *
    params.statorEffPenalty;

  const effFactor = combinedEfficiency / 0.7; // normalize to baseline
  const powerDraw = totalWeight / (baseGPerWatt * effFactor);

  // ── Hover Time ──
  const hoverTimeHours = powerDraw > 0 ? usableEnergy / powerDraw : 0;
  const hoverTimeMinutes = hoverTimeHours * 60;

  return {
    hoverTimeMinutes: Math.round(hoverTimeMinutes * 10) / 10,
    totalWeight: Math.round(totalWeight),
    batteryEnergy: Math.round(batteryEnergyWh * 10) / 10,
    powerDraw: Math.round(powerDraw * 10) / 10,
    efficiency: Math.round(combinedEfficiency * 100),
  };
}

/**
 * Get the optimal hover time (all correct answers) for a given size.
 */
export function getOptimalHoverTime(sizeId = '10') {
  const questions = getQuestionsForSize(sizeId);
  const optimalAnswers = {};
  for (const q of questions) {
    optimalAnswers[q.id] = q.correctAnswer;
  }
  return estimateHoverTime(optimalAnswers, sizeId);
}

/**
 * Resolve parameter values from answer selections.
 * Falls back to size-specific baseline values if an answer is missing.
 */
function resolveParameters(answers, sizeConfig, questions) {
  const params = { ...sizeConfig.defaults };

  for (const q of questions) {
    const selectedId = answers[q.id];
    if (!selectedId || !q.parameterValues[selectedId]) continue;

    const values = q.parameterValues[selectedId];

    switch (q.id) {
      case 'frame-material':
        params.frameWeightG = values.frameWeightG;
        break;
      case 'frame-geometry':
        params.geoEffMult = values.geoEffMult;
        break;
      case 'motor-kv':
        params.motorEffAtHover = values.motorEffAtHover;
        params.motorWeightG = values.motorWeightG;
        break;
      case 'motor-stator':
        if (values.motorWeightOverride) params.motorWeightG = values.motorWeightOverride;
        params.statorEffPenalty = values.effPenalty;
        break;
      case 'blade-count':
        params.bladeEffMult = values.bladeEffMult;
        break;
      case 'prop-pitch':
        params.pitchEffMult = values.pitchEffMult;
        break;
      case 'blade-profile':
        params.profileEffMult = values.profileEffMult;
        break;
      case 'prop-material':
        params.matEffMult = values.matEffMult;
        params.matWeightMult = values.matWeightMult;
        break;
      case 'battery-chemistry':
        params.energyDensityWhKg = values.energyDensityWhKg;
        params.batteryWeightG = values.batteryWeightG;
        break;
    }
  }

  return params;
}

/**
 * Format minutes into a readable string.
 */
export function formatHoverTime(minutes) {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
  }
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
