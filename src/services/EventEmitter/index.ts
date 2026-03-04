class EventEmitter<T> {
    private listeners = new Set<(event: T) => void>();

    public subscribe(callback: (event: T) => void): () => boolean {
        this.listeners.add(callback);

        return () => this.listeners.delete(callback);
    }

    public emit(event: T) {
        this.listeners.forEach((listener) => listener(event));
    }
}

export default EventEmitter;
