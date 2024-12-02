const BucketTracker = {
    config: {
        bucketImage: 'bucket-hd-75cc64ad03.png',
        canvasSelector: 'canvas',
        markerColor: '#00ff00'
    },

    init() {
        document.addEventListener('preloader.complete', () => {
            this.setupCanvas();
            this.startTracking();
        });
    },

    setupCanvas() {
        const stage = new Concrete.Stage({
            container: document.querySelector(this.config.canvasSelector),
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.layer = new Concrete.Layer();
        stage.add(this.layer);
    },

    startTracking() {
        const buckets = document.querySelectorAll(`[style*="${this.config.bucketImage}"]`);
        buckets.forEach((bucket, index) => {
            this.markBucket(bucket, index);
        });

        // Keep tracking through animations
        requestAnimationFrame(() => this.startTracking());
    },

    markBucket(bucket, index) {
        const rect = bucket.getBoundingClientRect();
        const marker = new Concrete.Rectangle({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
            stroke: this.config.markerColor,
            strokeWidth: 3
        });
        this.layer.add(marker);
        this.layer.render();
    }
};

// Launch tracker
BucketTracker.init();
