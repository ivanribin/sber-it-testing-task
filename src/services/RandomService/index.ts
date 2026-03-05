export type TWeightedOption<T> = { value: T; probability: number };

class RandomService {
    public static getRandomWeighted<T>(options: TWeightedOption<T>[]): T {
        const total: number = options.reduce(
            (total, option: TWeightedOption<T>) => total + option.probability,
            0,
        );

        if (total > 1) {
            throw new Error("Total probability exceeds 1");
        }

        const rand: number = Math.random();

        let cumulative: number = 0;

        for (const option of options) {
            cumulative += option.probability;

            if (rand < cumulative) {
                return option.value;
            }
        }

        return options[options.length - 1].value;
    }
}

export default RandomService;
