
export const randomFloat = (min, max) => Math.random() * (max - min) + min;

export const randomInt = (min, max) => Math.floor(randomFloat(min, max));