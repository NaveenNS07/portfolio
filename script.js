document.addEventListener('DOMContentLoaded', () => {
    // Basic example of a dynamic greeting or hover effect
    const nameElement = document.querySelector('.name');
    const greetingElement = document.querySelector('.greeting');

    if (nameElement && greetingElement) {
        nameElement.addEventListener('mouseover', () => {
            greetingElement.textContent = "Welcome! I'm";
        });

        nameElement.addEventListener('mouseout', () => {
            greetingElement.textContent = "Hello! I am";
        });
    }

    // You can add more complex animations here, like a typing effect
    // For the "Judges a book by its cover" part, a simple CSS animation for the cursor is used.
    // For more advanced text animations (like typing each letter), you'd need a dedicated library or more complex JS.
});
document.addEventListener('DOMContentLoaded', () => {
    const centralLogo = document.querySelector('#cross-functional-team-section .central-logo');
    const topTechIconsContainer = document.querySelector('#cross-functional-team-section .tech-icons-top-wrapper');
    const topTechIcons = document.querySelectorAll('#cross-functional-team-section .tech-icon-item');
    const linesContainer = document.querySelector('#cross-functional-team-section .lines-container');
    const orbitalRing = document.querySelector('#cross-functional-team-section .orbital-ring');
    const orbitalIcons = document.querySelectorAll('#cross-functional-team-section .orbital-icon-item');

    // --- Dynamic Positioning for Top Tech Icons ---
    const positionTopTechIcons = () => {
        const containerWidth = topTechIconsContainer.offsetWidth;
        const containerHeight = topTechIconsContainer.offsetHeight; // This will determine the "spread" height
        const iconCount = topTechIcons.length;
        const spacingFactor = 0.8; // Adjust to spread icons more or less horizontally
        const yOffset = 0.1; // Adjust how far down the container the icons start

        topTechIcons.forEach((icon, index) => {
            // Distribute icons horizontally
            const x = (index / (iconCount - 1)) * containerWidth * spacingFactor + (containerWidth * (1 - spacingFactor)) / 2;
            // Place icons slightly down from the top, creating a curved-like distribution
            const y = containerHeight * (yOffset + (Math.sin(index / (iconCount - 1) * Math.PI) * 0.3)); // Creates a slight arc

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
            icon.style.transform = 'translate(-50%, -50%)'; // Center the icon based on its top/left
        });
    };

    // --- Dynamic Positioning for Orbital Icons ---
    const positionOrbitalIcons = () => {
        const ringWidth = orbitalRing.offsetWidth;
        const ringHeight = orbitalRing.offsetHeight;
        const iconCount = orbitalIcons.length;

        orbitalIcons.forEach((icon, index) => {
            const angle = (index / iconCount) * 2 * Math.PI; // Full circle distribution
            const x = (ringWidth / 2) * Math.cos(angle);
            const y = (ringHeight / 2) * Math.sin(angle);

            icon.style.left = `${ringWidth / 2 + x}px`;
            icon.style.top = `${ringHeight / 2 + y}px`;
            icon.style.transform = 'translate(-50%, -50%)'; // Center the icon
        });
    };

    // --- Line Drawing and Interaction ---
    const drawConnectingLines = () => {
        linesContainer.innerHTML = ''; // Clear existing lines

        // Get central logo's absolute position and adjust for center
        const centralRect = centralLogo.getBoundingClientRect();
        const centralX = centralRect.left + centralRect.width / 2 + window.scrollX;
        const centralY = centralRect.top + centralRect.height / 2 + window.scrollY;

        topTechIcons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const iconX = iconRect.left + iconRect.width / 2 + window.scrollX;
            const iconY = iconRect.top + iconRect.height / 2 + window.scrollY;

            // Calculate delta X and Y
            const dx = iconX - centralX;
            const dy = iconY - centralY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            const line = document.createElement('div');
            line.classList.add('connecting-line');
            linesContainer.appendChild(line);

            // Position and rotate the line
            line.style.width = `${distance}px`;
            // Adjust line origin to start from central logo, not necessarily center of the screen
            line.style.left = `${centralX - linesContainer.getBoundingClientRect().left}px`;
            line.style.top = `${centralY - linesContainer.getBoundingClientRect().top}px`;
            line.style.transform = `rotate(${angle}deg)`;

            // Attach hover events to the icon to show/hide the line
            icon.addEventListener('mouseenter', () => {
                line.style.opacity = '1';
                line.style.transform = `rotate(${angle}deg) scaleX(1)`;
            });
            icon.addEventListener('mouseleave', () => {
                line.style.opacity = '0';
                line.style.transform = `rotate(${angle}deg) scaleX(0)`; // Animate out
            });

            // Initial state: scaled down
            line.style.transform = `rotate(${angle}deg) scaleX(0)`;
        });
    };

    // Initialize positions and lines
    const initializeSection = () => {
        positionTopTechIcons();
        positionOrbitalIcons();
        // Delay drawing lines slightly to allow rendering of icons
        setTimeout(drawConnectingLines, 100);
    };

    initializeSection();

    // Recalculate positions on window resize
    window.addEventListener('resize', () => {
        initializeSection();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (existing constants) ...
    const topTechIcons = document.querySelectorAll('#cross-functional-team-section .tech-icon-item');
    // ... (existing constants for centralLogo, logoNameTooltip, orbitalRing, orbitalIcons) ...

    // --- Dynamic Positioning for Top Tech Icons ---
    // ... (keep positionTopTechIcons function as is) ...

    // --- Dynamic Positioning for Orbital Icons ---
    // ... (keep positionOrbitalIcons function as is) ...

    // --- Line Drawing and Interaction ---
    // ... (keep drawConnectingLines function as is) ...

    // --- Central Logo Name Pop-up (JS Controlled) ---
    // ... (keep this block as is if you still want it for the central logo) ...

    // --- New: Tech Icon Name Tooltips (JS Controlled) ---

    // Function to create, show, and hide tooltips for tech icons
    const setupTechIconTooltips = () => {
        topTechIcons.forEach(icon => {
            const techName = icon.dataset.tech; // Get the tech name from data-tech attribute
            if (!techName) return; // Skip if no data-tech is set

            // Create the tooltip element
            const tooltip = document.createElement('span');
            tooltip.classList.add('tech-icon-tooltip');
            tooltip.textContent = techName.charAt(0).toUpperCase() + techName.slice(1).replace('-', ' '); // Capitalize first letter and replace hyphen
            icon.appendChild(tooltip); // Append tooltip inside the icon for relative positioning

            let showIconTooltipTimeout;
            let hideIconTooltipTimeout;

            icon.addEventListener('mouseenter', () => {
                clearTimeout(hideIconTooltipTimeout);
                showIconTooltipTimeout = setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.top = '-35px'; // Position above the icon
                    tooltip.style.transform = 'translateX(-50%) scale(1)';
                }, 100);
            });

            icon.addEventListener('mouseleave', () => {
                clearTimeout(showIconTooltipTimeout);
                hideIconTooltipTimeout = setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.top = '-20px'; // Move down slightly as it hides
                    tooltip.style.transform = 'translateX(-50%) scale(0.9)';
                }, 200);
            });
        });
    };


    // --- Initialization ---
    const initializeSection = () => {
        positionTopTechIcons();
        positionOrbitalIcons();
        // Delay drawing lines slightly to allow rendering of icons
        setTimeout(drawConnectingLines, 100);
        // Call the new tooltip setup function
        setupTechIconTooltips();
    };

    initializeSection();

    // Recalculate positions on window resize
    window.addEventListener('resize', () => {
        initializeSection();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const centralLogo = document.querySelector('#cross-functional-team-section .central-logo');
    const topTechIconsContainer = document.querySelector('#cross-functional-team-section .tech-icons-top-wrapper');
    const topTechIcons = document.querySelectorAll('#cross-functional-team-section .tech-icon-item');
    const linesContainer = document.querySelector('#cross-functional-team-section .lines-container');
    const orbitalRing = document.querySelector('#cross-functional-team-section .orbital-ring');
    const orbitalIcons = document.querySelectorAll('#cross-functional-team-section .orbital-icon-item');

    // --- Dynamic Positioning for Top Tech Icons ---
    const positionTopTechIcons = () => {
        const containerWidth = topTechIconsContainer.offsetWidth;
        const iconCount = topTechIcons.length;
        const startX = 0; // Start from left edge of container
        const endX = containerWidth; // End at right edge
        const yPosition = 0; // Fixed Y position relative to top of container

        topTechIcons.forEach((icon, index) => {
            // Distribute icons evenly across the width
            const x = startX + (endX - startX) * (index / (iconCount - 1));
            icon.style.left = `${x}px`;
            icon.style.top = `${yPosition}px`;
            icon.style.transform = 'translate(-50%, -50%)'; // Center the icon
        });
    };

    // --- Dynamic Positioning for Orbital Icons (Bottom Ring) ---
    const positionOrbitalIcons = () => {
        const ringWidth = orbitalRing.offsetWidth;
        const ringHeight = orbitalRing.offsetHeight; // Assuming orbitalRing has some height
        const iconCount = orbitalIcons.length;
        const radiusX = ringWidth / 2 * 0.9; // Horizontal radius of ellipse
        const radiusY = ringHeight / 2 * 0.9; // Vertical radius of ellipse (adjust for squashed look)

        orbitalIcons.forEach((icon, index) => {
            const angle = (index / iconCount) * 2 * Math.PI; // Full circle distribution
            const x = radiusX * Math.cos(angle);
            const y = radiusY * Math.sin(angle);

            // Position relative to the center of the orbitalRing container
            icon.style.left = `${ringWidth / 2 + x}px`;
            icon.style.top = `${ringHeight / 2 + y}px`;
            icon.style.transform = 'translate(-50%, -50%)'; // Center the icon
        });
    };

    // --- Line Drawing and Interaction (from central logo to top icons) ---
    const drawConnectingLines = () => {
        linesContainer.innerHTML = ''; // Clear existing lines

        // Get central logo's position relative to the linesContainer
        const centralRect = centralLogo.getBoundingClientRect();
        const linesContainerRect = linesContainer.getBoundingClientRect();

        const centralX_relativeToLines = (centralRect.left + centralRect.width / 2) - linesContainerRect.left;
        const centralY_relativeToLines = (centralRect.top + centralRect.height / 2) - linesContainerRect.top;

        topTechIcons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const iconX_relativeToLines = (iconRect.left + iconRect.width / 2) - linesContainerRect.left;
            const iconY_relativeToLines = (iconRect.top + iconRect.height / 2) - linesContainerRect.top;

            // Calculate delta X and Y
            const dx = iconX_relativeToLines - centralX_relativeToLines;
            const dy = iconY_relativeToLines - centralY_relativeToLines;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            const line = document.createElement('div');
            line.classList.add('connecting-line');
            linesContainer.appendChild(line);

            // Position and rotate the line
            line.style.width = `${distance}px`;
            line.style.left = `${centralX_relativeToLines}px`;
            line.style.top = `${centralY_relativeToLines}px`;
            line.style.transform = `rotate(${angle}deg)`;

            // Attach hover events to the icon to show/hide the line
            icon.addEventListener('mouseenter', () => {
                line.style.opacity = '1';
                line.style.transform = `rotate(${angle}deg) scaleX(1)`;
            });
            icon.addEventListener('mouseleave', () => {
                line.style.opacity = '0';
                line.style.transform = `rotate(${angle}deg) scaleX(0)`; // Animate out
            });

            // Initial state: scaled down
            line.style.transform = `rotate(${angle}deg) scaleX(0)`;
        });
    };


    // --- Initialization ---
    const initializeSection = () => {
        positionTopTechIcons();
        positionOrbitalIcons();
        // Delay drawing lines slightly to allow rendering of icons
        setTimeout(drawConnectingLines, 100);
    };

    initializeSection();

    // Recalculate positions on window resize
    window.addEventListener('resize', () => {
        initializeSection();
    });
});

// In work-experience-section.js

document.addEventListener('DOMContentLoaded', () => {
    const learnMoreButtons = document.querySelectorAll('#work-experience-section .learn-more-btn');
    const projectExpandedView = document.getElementById('project-expanded-view');
    const hideDetailsButton = projectExpandedView.querySelector('.hide-details-btn');

    const expandedImage = projectExpandedView.querySelector('.expanded-image img');
    const expandedTitle = projectExpandedView.querySelector('.expanded-title');
    const expandedShortDesc = projectExpandedView.querySelector('.expanded-short-desc');
    const expandedLongDesc = projectExpandedView.querySelector('.expanded-long-desc');


    // Centralized Project Data
    const projectsData = {
        "cib-mobile-book": { // Matches data-project-id in HTML
            icon: "C:\Users\mmnav\OneDrive\Documents\portfolio\logo\fullstack.png",
            title: "Full Stack Website",
            shortDesc: "It is a good experience to develope a Full Stack Website",
            longDesc: `Developed a full-stack Real Estate Listing Website with features like property search, filters, user authentication, and listing management. Used React for the frontend, Node.js and Express for the backend, and MongoDB for the database. Ensured responsive design and smooth user experience.`
        },
        "cib-mobile-bulb": {
            icon: "work-images/bulb-icon.png",
            title: "CIB on the Mobile: Innovative Features",
            shortDesc: "Exploring new features for enhancing mobile banking experience.",
            longDesc: `This project involved integrating cutting-edge features such as AI-driven financial insights, personalized investment recommendations, and advanced security protocols. Our team leveraged machine learning algorithms to analyze user behavior and provide proactive financial advice, enhancing the value proposition for customers. <br><br>
                       Key areas: AI-driven insights, personalized recommendations, biometric security. <br>
                       Tools & Techniques: Python (TensorFlow/PyTorch), AWS SageMaker, Data Lake for analytics. <br>
                       Impact: Increased user engagement by 30%, introduced personalized advisory services, enhanced app security ratings.`
        },
        "cib-mobile-cup": {
            icon: "work-images/cup-icon.png",
            title: "CIB on the Mobile: UI/UX Redesign",
            shortDesc: "A complete overhaul of the user interface for a fresh look and improved usability.",
            longDesc: `This project involved a comprehensive redesign of the CIB Mobile application's user interface and user experience. Our aim was to create a more intuitive, visually appealing, and accessible platform. We conducted extensive user research, A/B testing, and incorporated modern design principles to ensure a seamless and delightful user journey. The redesign resulted in higher user retention and increased feature adoption. <br><br>
                       Focus areas: Simplified navigation, dark mode implementation, accessibility features (WCAG 2.1). <br>
                       Tools: Figma, Adobe XD, UserTesting.com. <br>
                       Outcome: 15% increase in feature adoption, improved app store ratings, positive user feedback on new design.`
        },
        "cib-mobile-sphere": {
            icon: "work-images/sphere-icon.png",
            title: "CIB on the Mobile: Backend Optimization",
            shortDesc: "Enhancing performance and scalability of the mobile application's backend infrastructure.",
            longDesc: `This project concentrated on optimizing the backend infrastructure supporting the CIB Mobile application. We migrated existing services to a microservices architecture, implemented advanced caching mechanisms, and fine-tuned database queries to handle increased user load and improve response times. The optimizations led to a significant improvement in application speed and stability, supporting a larger user base without compromising performance. <br><br>
                       Key areas: Microservices migration, database sharding, API optimization. <br>
                       Technologies: Kubernetes, Kafka, Redis, PostgreSQL. <br>
                       Results: Reduced API latency by 40%, improved system uptime to 99.99%, successfully scaled to handle 2x user traffic.`
        }
        // Add more project data objects here, matching the data-project-id in HTML
    };

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.work-card'); // Get the parent .work-card
            const projectId = card.dataset.projectId; // Get the ID from data-project-id
            const projectData = projectsData[projectId]; // Get corresponding data

            // Populate the expanded view
            if (projectData) {
                expandedImage.src = projectData.icon;
                expandedImage.alt = projectData.title + " icon";
                expandedTitle.textContent = projectData.title;
                expandedShortDesc.textContent = projectData.shortDesc;
                expandedLongDesc.innerHTML = projectData.longDesc; // Use innerHTML for line breaks/HTML content

                // Add active class to show and animate the expanded view
                projectExpandedView.classList.add('active');

                // Optional: Scroll to the expanded view
                projectExpandedView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error("Project data not found for:", projectId);
            }
        });
    });

    // Event listener for the "HIDE DETAILS" button
    hideDetailsButton.addEventListener('click', () => {
        projectExpandedView.classList.remove('active');
        // Clear content after transition for cleaner DOM (optional)
        setTimeout(() => {
            expandedImage.src = "";
            expandedImage.alt = "";
            expandedTitle.textContent = "";
            expandedShortDesc.textContent = "";
            expandedLongDesc.innerHTML = "";
        }, 700); // Match CSS transition duration
    });
});

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.work-card'); // Get the parent .work-card
            const projectId = card.dataset.projectId; // Get the ID from data-project-id
            const projectData = projectsData[projectId]; // Get corresponding data

            const expandedDetails = card.querySelector('.card-expanded-details');
            const longDescParagraph = expandedDetails.querySelector('.card-long-desc');

            if (card.classList.contains('expanded')) {
                // If currently expanded, collapse it
                card.classList.remove('expanded');
                button.textContent = "LEARN MORE";
                // Clear content after transition for cleaner DOM (optional)
                setTimeout(() => {
                    longDescParagraph.innerHTML = '';
                }, 700); // Match CSS transition duration
            } else {
                // If not expanded, expand it
                // Populate content before expanding
                if (projectData && projectData.longDesc) {
                    longDescParagraph.innerHTML = projectData.longDesc;
                } else {
                    longDescParagraph.innerHTML = 'No detailed description available.';
                }

                card.classList.add('expanded');
                button.textContent = "SHOW LESS";
            }
        });
    });
// In featured-project-section.js

document.addEventListener('DOMContentLoaded', () => {
    const featuredContentWrapper = document.querySelector('#featured-project-section .featured-content-wrapper');
    const sectionHeading = featuredContentWrapper.querySelector('.section-heading');
    const projectTitle = featuredContentWrapper.querySelector('.project-title');
    const projectDescription = featuredContentWrapper.querySelector('.project-description');
    const mockupTopImg = featuredContentWrapper.querySelector('.mockup-top img');
    const mockupBottomImg = featuredContentWrapper.querySelector('.mockup-bottom img');
    const navDotsContainer = featuredContentWrapper.querySelector('.project-navigation-dots');

    let currentProjectIndex = 0;

    // --- Define your Featured Project Data Here ---
    const featuredProjects = [
        {
            heading: "Featured Project", // Keep this static or change per project
            title: "Example Project",
            description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
            images: {
                top: "featured-images/project-top-mockup.png",
                bottom: "featured-images/project-bottom-mockup.png"
            }
            // Add a live demo link or case study link here if needed
            // liveDemo: "https://www.example.com/project-demo",
            // caseStudy: "https://www.example.com/project-casestudy"
        },
        {
            heading: "Latest Work",
            title: "Smart Home Dashboard",
            description: "An intuitive control panel for smart home devices. Monitor energy consumption, manage lighting scenes, and automate routines, all from a unified interface. Designed for seamless integration with popular smart home ecosystems.",
            images: {
                top: "featured-images/smarthome-top-mockup.png", // Replace with your actual image paths
                bottom: "featured-images/smarthome-bottom-mockup.png"
            }
        },
        {
            heading: "Client Project",
            title: "E-commerce Redesign",
            description: "Revamped a client's online store with a modern, responsive design and improved user flow. Focus on conversion optimization through A/B tested layouts and a streamlined checkout process. Integrated new payment gateways and inventory management.",
            images: {
                top: "featured-images/ecommerce-top-mockup.png", // Replace with your actual image paths
                bottom: "featured-images/ecommerce-bottom-mockup.png"
            }
        }
        // Add more featured projects here
    ];

    // Function to update the displayed project content
    const updateProjectDisplay = (index) => {
        if (index < 0 || index >= featuredProjects.length) {
            console.error("Invalid project index:", index);
            return;
        }

        const project = featuredProjects[index];

        // Add a class for a fade-out effect during content change
        featuredContentWrapper.classList.add('fade-out');

        setTimeout(() => {
            sectionHeading.textContent = project.heading;
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;
            mockupTopImg.src = project.images.top;
            mockupTopImg.alt = project.title + " Top Mockup";
            mockupBottomImg.src = project.images.bottom;
            mockupBottomImg.alt = project.title + " Bottom Mockup";

            // Update active navigation dot
            navDotsContainer.querySelectorAll('.nav-dot').forEach((dot, dotIndex) => {
                if (dotIndex === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Remove fade-out class to reveal new content
            featuredContentWrapper.classList.remove('fade-out');
            currentProjectIndex = index;
        }, 500); // Duration matches CSS transition
    };

    // Function to generate navigation dots based on projects data
    const generateNavDots = () => {
        navDotsContainer.innerHTML = ''; // Clear existing dots
        featuredProjects.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('nav-dot');
            dot.dataset.projectIndex = index;
            if (index === currentProjectIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                updateProjectDisplay(index);
            });
            navDotsContainer.appendChild(dot);
        });
    };

    // Initial load: Display the first project and generate dots
    generateNavDots(); // Call before first display to ensure dots exist for activation
    updateProjectDisplay(currentProjectIndex);

    // Optional: Auto-cycle projects (uncomment to enable)
    /*
    let autoCycleInterval;
    const startAutoCycle = () => {
        clearInterval(autoCycleInterval); // Clear any existing interval
        autoCycleInterval = setInterval(() => {
            const nextIndex = (currentProjectIndex + 1) % featuredProjects.length;
            updateProjectDisplay(nextIndex);
        }, 8000); // Change project every 8 seconds
    };
    startAutoCycle(); // Start auto-cycling on load

    // Pause auto-cycle on hover, resume on mouse leave
    featuredContentWrapper.addEventListener('mouseenter', () => clearInterval(autoCycleInterval));
    featuredContentWrapper.addEventListener('mouseleave', startAutoCycle);
    */

    // Optional: Image click to enlarge or link (requires a lightbox solution or new tab logic)
    // mockupTopImg.addEventListener('click', () => window.open(featuredProjects[currentProjectIndex].liveDemo, '_blank'));
    // mockupBottomImg.addEventListener('click', () => window.open(featuredProjects[currentProjectIndex].caseStudy, '_blank'));

});

// In contact-section.js

document.addEventListener('DOMContentLoaded', () => {
    // No specific JavaScript functionality needed for this static contact section
    // Dynamic form submission or more complex effects would go here.
});

