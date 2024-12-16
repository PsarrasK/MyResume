let currentLanguage = 'en'; // Default language

const renderContent = (lang) => {
    currentLanguage = lang;

    fetch(`data_${currentLanguage}.json`)
        .then(response => response.json())
        .then(data => {

            // Populate Basic Info
            const basicInfo = document.getElementById("personal");
            basicInfo.innerHTML = `
                <div class="name">${data.personal.firstName}</div>
                <div class="name">${data.personal.lastName}</div>
                <div class="role">${data.personal.role}</div>
            `;

            // Populate Contact Info
            const contactInfo = document.getElementById("contact");
            contactInfo.innerHTML = data.contact.map(info => {
                // Only show the type and icon if type exists
                const contactImage = info.icon ? `
                    <img src="${info.icon}" alt="${info.type}" class="icon">
                    ${info.text}
                ` : `${info.text}`;

                return `
                    <a href="${info.link}" target="_blank" class="link">
                        <div class="line" title="${info.hoverDesc}">
                            ${contactImage}
                        </div>
                    </a>
                `;
            }).join("");

            const biography = document.getElementById("biography");
            // Loop through sections in the JSON data
            biography.innerHTML = `
                ${data.bio.title ? `<h1>${data.bio.title}</h1>` : ""}
                ${data.bio.items.map(item => `
                    ${item.description ? `<p>${item.description}</p>` : ""}
                `).join("")}
            `;

            // Sort items by "time" before rendering
            education.innerHTML = `
                ${data.edu.title ? `<h1>${data.edu.title}</h1>` : ""}
                <div class="${data.edu.grid}">
                    ${data.edu.items
                    .sort((a, b) => {
                        // Ensure that time is in a comparable format (e.g., YYYY-MM-DD)
                        return a.time.localeCompare(b.time);
                    })
                    .map(item => `
                        <div${item.class === "timeline-item" ? ` class="timeline-item"` : ""}>
                            ${item.class === "timeline-item" ? `<div class="dot2"></div>` : ""}
                            ${item.link ? `<a href="${item.link}" target="_blank" class="link">` : ""}
                            ${item.certTitle ? `<h2>${item.certTitle}</h2>` : ""}
                            ${item.link ? `</a>` : ""}
                            ${item.certDetails ? `<h3>${item.certDetails} | ${item.time}</h3>` : ""}
                            ${item.description ? `<p>${item.description}</p>` : ""}
                        </div>
                    `).join("")}
                </div>
            `;

            projects.innerHTML = `
                ${data.proj.title ? `<h1>${data.proj.title}</h1>` : ""}
                <div class="${data.proj.grid}">
                    ${data.proj.items
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(item => `
                        <div${item.class === "timeline-item" ? ` class="timeline-item"` : ""}>
                            ${item.class === "timeline-item" ? `<div class="dot2"></div>` : ""}
                        <h2>
                            ${item.link ?
                            `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="link">
                                ${item.subtitle}
                                <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                            </a>` :
                            `${item.subtitle}`
                            }
                        </h2>

                            
                            ${item.projectCategory ? `<h3>${item.projectCategory} | ${item.time}</h3>` : ""}
                            ${item.description ? `<p>${item.description}</p>` : ""}
                            <div style="margin-left: 30px;">
                                ${item.exercisedSkills && item.exercisedSkills.items.length > 0 ? `
                                    <h4 class="timeLineDetails" title="Sorted alphabetically">${item.exercisedSkills.name || "Exercised Skills"}:</h4>
                                    <ul class="skills" style="margin-left: 30px;">
                                        ${item.exercisedSkills.items
                                        .sort((a, b) => a.localeCompare(b)) // Sort skills alphabetically
                                        .map(skill => `<li>◦ ${skill}</li>`)
                                        .join("")}
                                    </ul>
                                ` : ""}
                                ${item.responsibilities && item.responsibilities.items.length > 0 ? `
                                    <h4 class="timeLineDetails" title="Sorted alphabetically">${item.responsibilities.name || "Responsibilities"}:</h4>
                                    <ul class="skills" style="margin-left: 30px;">
                                        ${item.responsibilities.items
                                        .sort((a, b) => a.localeCompare(b)) // Sort responsibilities alphabetically
                                        .map(resp => `<li>◦ ${resp}</li>`)
                                        .join("")}
                                    </ul>
                                ` : ""}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;

            experience.innerHTML = `
                ${data.experience.title ? `<h1>${data.experience.title}</h1>` : ""}
                <div class="${data.experience.grid}">
                    ${data.experience.items
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(item => `
                        <div${item.class === "timeline-item" ? ` class="timeline-item"` : ""}>
                            ${item.class === "timeline-item" ? `<div class="dot2"></div>` : ""}
                            
                            <h2>
                                ${item.companyLink ?
                                    `<a href="${item.companyLink}" target="_blank" rel="noopener noreferrer" class="link">
                                    ${item.role} at ${item.company}${item.extCompany ? ` via ${item.extCompany}` : ""}
                                    <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                                </a>` :
                                    `${item.role} at ${item.company}${item.extCompany ? ` via ${item.extCompany}` : ""}`}
                            </h2>
                                
                            ${item.jobDescription ? `<h3>${item.jobDescription} | ${item.time}</h3>` : ""}
                            ${item.description ? `<p>${item.description}</p>` : ""}
                            
                            <div style="margin-left: 30px;">
                                ${item.exercisedSkills && item.exercisedSkills.items.length > 0 ? `
                                    <h4 title="Sorted alphabetically">${item.exercisedSkills.name || "Exercised Skills"}:</h4>
                                    <ul class="skills" style="margin-left: 30px;">
                                        ${item.exercisedSkills.items
                                        .sort((a, b) => a.localeCompare(b)) // Sort skills alphabetically
                                        .map(skill => `<li>◦ ${skill}</li>`)
                                        .join("")}
                                    </ul>
                                ` : ""}
                                ${item.responsibilities && item.responsibilities.items.length > 0 ? `
                                    <h4 title="Sorted alphabetically">${item.responsibilities.name || "Responsibilities"}:</h4>
                                    <ul class="skills" style="margin-left: 30px;">
                                        ${item.responsibilities.items
                                        .sort((a, b) => a.localeCompare(b)) // Sort responsibilities alphabetically
                                        .map(resp => `<li>◦ ${resp}</li>`)
                                        .join("")}
                                    </ul>
                                ` : ""}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;

            // Assume `data` contains the JSON object
            const languages = document.getElementById("languages");

            // Generate the title and the language items
            languages.innerHTML = `
            ${data.lang.title ? `<h1>${data.lang.title}</h1>` : ""}
            ${data.lang.description ? `<p>${data.lang.description}</p>` : ""}
            <div class="languageSkills">
                ${data.lang.items.map(item => {
                const {title, percentage} = item; // Destructure title and percentage from the JSON object
                return `
                    <div class="language" id="${title}">
                        <div class="progress-circle">
                            <svg
                                class="circle-svg"
                                height="72"
                                width="72"
                                viewBox="0 0 36 36">
                                <circle class="progress" cx="18" cy="18" r="15.9" style="fill:none; stroke:black; stroke-dasharray: 100; stroke-dashoffset: calc(100 - ${percentage});">
                                </circle>
                            </svg>
                            <div class="percentage">
                                <span>${percentage}%</span>
                                <span>${title}</span>
                            </div>
                        </div>
                    </div>
                    `;
            }).join("")}
            </div>
        `;

        // Populate Software Skills
        const tools = document.getElementById("tools");
        // Ensure the data and items exist
        if (data.tools && data.tools.items) {
            const {title, class: className, items} = data.tools;

            // Sort the items alphabetically by the 'text' field (name of the skill)
            const sortedItems = items.sort((a, b) => a.text.localeCompare(b.text));

            // Add the title of the section, displayed only once
            tools.innerHTML = `
                ${title ? `<h1 class="${className}">${title}</h1>` : ""}
                <div class="tools">
                    ${sortedItems.map(item => {
                        const {text, link, icon, hoverDesc} = item;
        
                        // Define the content for each item
                        const skillImage = icon ? `
                            <img src="${item.icon}" alt="" class="icon">
                            ${text || ''}
                        ` : `${text || ''}`;
        
                        // Conditionally wrap the content with <a> tag only if link is present
                        if (link) {
                            return `
                                <div class="toolContainer">
                                    <a href="${link}" target="_blank" rel="noopener noreferrer" title="${hoverDesc}" class="link">
                                        ${skillImage}
                                    </a>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="toolContainer">
                                    <a title="${hoverDesc}">
                                        ${skillImage}
                                    </a>
                                </div>
                            `;
                        }
                    }).join("")}
                </div>
            `;
        }

        const other = document.getElementById("other");
        const sortedOthers = data.other.items
        .sort()  // Sort items alphabetically
        .map((item, index, array) => {
            return `${item}${index < array.length - 1 ? ', ' : ''}`;
        })
        .join("");

        other.innerHTML = `
            ${data.other.title ? `<h1>${data.other.title}</h1>` : ""}
            <p>${sortedOthers}</p>
        `;

        const interests = document.getElementById("interests");
        const sortedInterests = data.interests.items
            .sort()  // Sort items alphabetically
            .map((item, index, array) => {
                return `${item}${index < array.length - 1 ? ', ' : ''}`;
            })
            .join("");

        interests.innerHTML = `
            ${data.interests.title ? `<h1>${data.interests.title}</h1>` : ""}
            <p>${sortedInterests}</p>
        `;

        if (lang === 'gr') {
            document.body.className = 'gr'; // Apply Greek styles
        } else {
            document.body.className = ''; // Remove language-specific styles for default
        }

    }).catch(error => console.error("Error loading JSON data:", error));
};

document.addEventListener("DOMContentLoaded", () => {
    // Select the element you want to apply the transition to
    const targetElement = document.querySelector(".photo"); // Example: a photo element

    // Add click event listener
    targetElement.addEventListener("click", function () {
        this.classList.toggle("active"); // Toggle the 'active' class
    });
});

document.getElementById('download').addEventListener('click', function() {
    const content = document.getElementById('printable');

    // Get the actual height of the content
    const contentHeight = content.scrollHeight + 5;

    // Define options for scaling and formatting
    const options = {
        margin:       0,              // No margins
        filename:     'Resume_Psarras_Konstantinos.pdf',
        pagebreak:    {
            mode: ['css', 'legacy']
        },
        enableLinks:  true,
        image: {
            type: 'jpeg',
            quality: 1
        },
        html2canvas:  {
            scale: 1.5,                // Increase resolution
            useCORS: true,           // Enable CORS for external resources (if needed)
            logging: false,          // Disable logging for performance
            imageTimeout: 3000,      // Wait for images to load before rendering
            allowTaint: true,        // Allow tainted canvas data
            windowWidth: content.offsetWidth, // Use content width
            windowHeight: contentHeight, // Dynamically adjust height
        },
        jsPDF:        { unit: 'px', format: [content.offsetWidth, contentHeight], orientation: 'portrait' }
    };

    // Create PDF from the content and save it
    html2pdf()
        .set({
            pagebreak: { mode: 'avoid-all', before: '#page2el' },})
        .from(content)
        .set(options)
        .save();
});

document.getElementById('sort').addEventListener('click', function () {
    // Select all elements with the "timeline" class
    const timelines = document.querySelectorAll('.timeline');

    // Toggle flex direction for each timeline element
    timelines.forEach(timeline => {
        if (timeline.style.flexDirection === 'column') {
            timeline.style.flexDirection = 'column-reverse';
        } else {
            timeline.style.flexDirection = 'column';
        }
    });

    // Toggle visibility of the button images
    const oldIcon = document.querySelector('.sortIcon.old');
    const newIcon = document.querySelector('.sortIcon.new');

    if (oldIcon.style.display === 'none') {
        oldIcon.style.display = 'inline';
        newIcon.style.display = 'none';
    } else {
        oldIcon.style.display = 'none';
        newIcon.style.display = 'inline';
    }

    const dots = document.querySelectorAll('.dot2');
    dots.forEach(dot => {
        dot.classList.toggle('rotated');
    });
});

// Render default language content on page load
document.addEventListener('DOMContentLoaded', () => {
    renderContent(currentLanguage);
});

// Add event listener for language toggle
// document.getElementById('language-toggle').addEventListener('click', () => {
//     currentLanguage = currentLanguage === 'en' ? 'gr' : 'en';
//     renderContent(currentLanguage);
// });