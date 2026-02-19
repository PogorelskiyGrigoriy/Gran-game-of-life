import { describe, it, expect } from 'vitest';
import LifeGameService from './LifeGameService';

describe('Контрольные тесты правил игры Конвея', () => {
  
  it('Клетка умирает от одиночества (0 или 1 сосед)', () => {
    const matrix = [
      [1, 1, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    const service = new LifeGameService(matrix);
    const next = service.nextTurn();
    expect(next[0][0]).toBe(0); // Было 1, стал 0
  });

  it('Клетка выживает при 2 или 3 соседях', () => {
    const matrix = [
      [1, 1],
      [1, 0]
    ];
    const service = new LifeGameService(matrix);
    const next = service.nextTurn();
    expect(next[0][0]).toBe(1); // Левый верхний угол выжил (2 соседа)
  });

  it('Мертвая клетка оживает при ровно 3 соседях', () => {
    const matrix = [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ];
    const service = new LifeGameService(matrix);
    const next = service.nextTurn();
    expect(next[1][1]).toBe(1); // Центр ожил
  });

  it('Клетка умирает от перенаселения (4+ соседа)', () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
    const service = new LifeGameService(matrix);
    const next = service.nextTurn();
    expect(next[1][1]).toBe(0); // В центре было 4 соседа
  });
});