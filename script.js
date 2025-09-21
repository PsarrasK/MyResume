document.addEventListener("DOMContentLoaded", function () {
    const photo = document.querySelector(".photo");

    if (photo) {
        // Check if the image fails to load
        photo.onerror = function () {
            this.style.display = "none";
        };

        // Force reload to trigger error event if the image is missing
        fetch(photo.src, { method: "HEAD" })
            .then((response) => {
                if (!response.ok) {
                    photo.style.display = "none";
                }
            })
            .catch(() => {
                photo.style.display = "none";
            });
    }
});

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

            // Clear the container before rendering sections
            const container = document.getElementById("mainContent");
            container.innerHTML = '';

            // Render sections based on the order specified in the JSON
            data.sectionOrder.forEach(sectionId => {
                const section = document.createElement("section");
                section.id = sectionId;

                switch (sectionId) {
                    case "biography":
                        section.innerHTML = `
                            ${data.bio.title ? `<h1>${data.bio.title}</h1>` : ""}
                            ${data.bio.items.map(item => `
                                ${item.description ? `<p>${item.description}</p>` : ""}
                            `).join("")}
                        `;
                        break;
                    case "experience":
                        section.innerHTML = `
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
                                                ${item.title} at ${item.company}${item.extCompany ? ` via ${item.extCompany}` : ""}
                                                <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                                            </a>` :
                                `${item.title} at ${item.company}${item.extCompany ? ` via ${item.extCompany}` : ""}`}
                                        </h2>
                                        ${item.subtitle && item.time ? `<h3>${item.subtitle} | ${item.time}</h3>` :
                                            item.subtitle ? `<h3>${item.subtitle}</h3>` :
                                                item.time ? `<h3>${item.time}</h3>` : ""}
                                        ${item.description ? `<p>${item.description}</p>` : ""}
                                        <div style="margin-left: 30px;">
                                            ${item.subsection1 && item.subsection1.items.length > 0 ? `
                                                <h4 title="Sorted alphabetically">${item.subsection1.name || "Exercised Skills"}:</h4>
                                                <ul class="${item.subsection1.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection1.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(skill => `<li>◦ ${skill}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                            ${item.subsection2 && item.subsection2.items.length > 0 ? `
                                                <h4 title="Sorted alphabetically">${item.subsection2.name || "Responsibilities"}:</h4>
                                                <ul class="${item.subsection2.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection2.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(resp => `<li>◦ ${resp}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        break;
                    case "seminars":
                        section.innerHTML = `
                            ${data.seminars.title ? `<h1>${data.seminars.title}</h1>` : ""}
                            <div class="${data.seminars.grid}">
                                ${data.seminars.items
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map(item => `
                                    <div${item.class === "timeline-item" ? ` class="timeline-item"` : ""}>
                                        ${item.class === "timeline-item" ? `<div class="dot2"></div>` : ""}
                                        <h2>
                                            ${item.link ?
                                `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="link">
                                                ${item.title}
                                                <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                                            </a>` :
                                `${item.title}`}
                                        </h2>
                                        ${item.subtitle && item.time ? `<h3>${item.subtitle} | ${item.time}</h3>` :
                                            item.subtitle ? `<h3>${item.subtitle}</h3>` :
                                                item.time ? `<h3>${item.time}</h3>` : ""}
                                        ${item.description ? `<p>${item.description}</p>` : ""}
                                        <div style="margin-left: 30px;">
                                            ${item.subsection1 && item.subsection1.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection1.title || "Subsection 1"}:</h4>
                                                <ul class="${item.subsection1.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection1.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(skill => `<li>◦ ${skill}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                            ${item.subsection2 && item.subsection2.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection2.title || "Subsection 2"}:</h4>
                                                <ul class="${item.subsection2.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection2.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(resp => `<li>◦ ${resp}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        break;
                    case "publications":
                        section.innerHTML = `
                            ${data.publications.title ? `<h1>${data.publications.title}</h1>` : ""}
                            <div class="${data.publications.grid}">
                                ${data.publications.items
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map(item => `
                                    <div${item.class === "timeline-item" ? ` class="timeline-item"` : ""}>
                                        ${item.class === "timeline-item" ? `<div class="dot2"></div>` : ""}
                                        <h2>
                                            ${item.link ?
                                `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="link">
                                                ${item.title}
                                                <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                                            </a>` :
                                `${item.title}`}
                                        </h2>
                                        ${item.subtitle && item.time ? `<h3>${item.subtitle} | ${item.time}</h3>` :
                                            item.subtitle ? `<h3>${item.subtitle}</h3>` :
                                                item.time ? `<h3>${item.time}</h3>` : ""}
                                        ${item.description ? `<p>${item.description}</p>` : ""}
                                        <div style="margin-left: 30px;">
                                            ${item.subsection1 && item.subsection1.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection1.title || "Subsection 1"}:</h4>
                                                <ul class="${item.subsection1.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection1.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(skill => `<li>◦ ${skill}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                            ${item.subsection2 && item.subsection2.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection2.title || "Subsection 2"}:</h4>
                                                <ul class="${item.subsection2.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection2.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(resp => `<li>◦ ${resp}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        break;
                    case "education":
                        section.innerHTML = `
                            ${data.edu.title ? `<h1>${data.edu.title}</h1>` : ""}
                            <div class="${data.edu.grid}">
                                ${data.edu.items
                            .sort((a, b) => a.time.localeCompare(b.time))
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
                        break;

                    case "langsAndTools":
                        section.innerHTML = `
                            <div class="horizontalSections">
                                <div class="hsubs2" id="tools"></div>
                                <div class="hsubs2" id="languages"></div>
                            </div>
                        `;
                        // Populate Tools and Languages
                        const tools = document.createElement("div");
                        tools.id = "tools";
                        tools.innerHTML = `
                            ${data.tools.title ? `<h1>${data.tools.title}</h1>` : ""}
                            <div class="tools">
                                ${data.tools.items
                            .sort((a, b) => a.text.localeCompare(b.text))
                            .map(item => `
                                    <div class="toolContainer">
                                        <a href="${item.link}" target="_blank" rel="noopener noreferrer" title="${item.hoverDesc}" class="link">
                                            ${item.icon ? `<img src="${item.icon}" alt="" class="icon">` : ""}
                                            ${item.text}
                                        </a>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        section.querySelector("#tools").replaceWith(tools);

                        const languages = document.createElement("div");
                        languages.id = "languages";
                        languages.innerHTML = `
                            ${data.lang.title ? `<h1>${data.lang.title}</h1>` : ""}
                            ${data.lang.description ? `<p>${data.lang.description}</p>` : ""}
                            <div class="languageSkills">
                                ${data.lang.items.map(item => `
                                    <div class="language" id="${item.title}">
                                        <div class="progress-circle">
                                            <svg
                                                class="circle-svg"
                                                height="72"
                                                width="72"
                                                viewBox="0 0 36 36">
                                                <circle class="progress" cx="18" cy="18" r="15.9" style="fill:none; stroke:black; stroke-dasharray: 100; stroke-dashoffset: calc(100 - ${item.percentage});">
                                                </circle>
                                            </svg>
                                            <div class="percentage">
                                                <span>${item.percentage}%</span>
                                                <span>${item.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        section.querySelector("#languages").replaceWith(languages);
                        break;
                    case "projects":
                        section.innerHTML = `
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
                                                ${item.title}
                                                <img src="assets/icons/ui_url.svg" alt="open-in-new_icon" class="icon">
                                            </a>` :
                                `${item.title}`}
                                        </h2>
                                        ${item.subtitle && item.time ? `<h3>${item.subtitle} | ${item.time}</h3>` :
                                            item.subtitle ? `<h3>${item.subtitle}</h3>` :
                                                item.time ? `<h3>${item.time}</h3>` : ""}
                                        ${item.description ? `<p>${item.description}</p>` : ""}
                                        <div style="margin-left: 30px;">
                                            ${item.subsection1 && item.subsection1.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection1.title || "Exercised Skills"}:</h4>
                                                <ul class="${item.subsection1.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection1.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(skill => `<li>◦ ${skill}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                            ${item.subsection2 && item.subsection2.items.length > 0 ? `
                                                <h4 class="timeLineDetails" title="Sorted alphabetically">${item.subsection2.title || "Responsibilities"}:</h4>
                                                <ul class="${item.subsection2.listStyle || ''}" style="margin-left: 30px;">
                                                    ${item.subsection2.items
                                .sort((a, b) => a.localeCompare(b))
                                .map(resp => `<li>◦ ${resp}</li>`)
                                .join("")}
                                                </ul>
                                            ` : ""}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        `;
                        break;
                    case "otherAndInterests":
                        section.innerHTML = `
                            <div class="horizontalSections">
                                <div class="hsubs2" id="other"></div>
                                <div class="hsubs2" id="interests"></div>
                            </div>
                        `;
                        // Populate Other and Interests
                        const other = document.createElement("div");
                        other.id = "other";
                        const sortedOthers = data.other.items
                            .sort()
                            .map((item, index, array) => `${item}${index < array.length - 1 ? ', ' : ''}`)
                            .join("");
                        other.innerHTML = `
                            ${data.other.title ? `<h1>${data.other.title}</h1>` : ""}
                            <p>${sortedOthers}</p>
                        `;
                        section.querySelector("#other").replaceWith(other);

                        const interests = document.createElement("div");
                        interests.id = "interests";
                        const sortedInterests = data.interests.items
                            .sort()
                            .map((item, index, array) => `${item}${index < array.length - 1 ? ', ' : ''}`)
                            .join("");
                        interests.innerHTML = `
                            ${data.interests.title ? `<h1>${data.interests.title}</h1>` : ""}
                            <p>${sortedInterests}</p>
                        `;
                        section.querySelector("#interests").replaceWith(interests);
                        break;
                    default:
                        break;
                }

                container.appendChild(section);
            });

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

    // Generate the current date
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date();
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Inject the extra line for the PDF
    const pdfExtra = document.getElementById('pdfExtra');
    pdfExtra.innerHTML = '<a href="https://psarrask.github.io/MyResume/index.html" target="_blank">This document was saved on <span id="currentDate"></span>.\nClick here to check for potential updates in the online version.</a>';

    document.getElementById('currentDate').textContent = formattedDate;

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
