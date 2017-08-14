import { Inject } from '@angular/core';
import { GameInputService } from './game-input.types';
import { KeyboardControlService } from './keyboard.service';

export function gameInputControlsFactory(
  keyboard: KeyboardControlService,
): GameInputService[] {
  return [keyboard];
}
