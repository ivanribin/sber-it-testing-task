const HEX_BASE: number = 0x10000;
const RATIO: number = 1;
const RADIX: number = 16;

class IdService {
    private static generateRandomHexSegment = (): string => {
        const randomHexSegment: string = Math.floor(
            (RATIO + Math.random()) * HEX_BASE
        )
            .toString(RADIX)
            .substring(1);

        return randomHexSegment;
    };

    public static generateUniqueId = (): string => {
        const uniqueId: string = `${this.generateRandomHexSegment()}-${this.generateRandomHexSegment()}-${this.generateRandomHexSegment()}-${this.generateRandomHexSegment()}`;

        return uniqueId;
    };
}

export default IdService;
