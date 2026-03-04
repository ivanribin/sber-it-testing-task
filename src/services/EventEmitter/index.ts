class EventEmitter<T> {
    private listeners = new Set<(event: T) => void>();

    subscribe(callback: (event: T) => void): () => void {
        this.listeners.add(callback);

        return () => this.listeners.delete(callback);
    }

    emit(event: T) {
        this.listeners.forEach((listener) => listener(event));
    }
}

export default EventEmitter;
