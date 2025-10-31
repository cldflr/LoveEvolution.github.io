document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // Element appears when 30% of it is visible
        rootMargin: "0px 0px -100px 0px" // Start appearing earlier as it comes into view from bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.close-button');
    const youtubeVideo = document.getElementById('youtube-video');

    if (videoThumbnail && videoModal && closeButton && youtubeVideo) {
        videoThumbnail.addEventListener('click', () => {
            youtubeVideo.src = "https://www.youtube.com/embed/Wemm-i6XHr8?autoplay=1";
            videoModal.style.display = 'flex';
        });

        closeButton.addEventListener('click', () => {
            videoModal.style.display = 'none';
            youtubeVideo.src = ''; // Stop video playback
        });

        window.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                videoModal.style.display = 'none';
                youtubeVideo.src = ''; // Stop video playback
            }
        });
    }
});