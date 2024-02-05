// ==UserScript==
// @name         Copy Job
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show job title and company name on the left-hand side
// @match        *://*.naukri.com/job-listings*
// @match        *://*.linkedin.com/jobs/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/dwaynekd/Copy-Jobs/main/copyjobs.js
// ==/UserScript==

function addSidebar() {
    'use strict';

    // Remove the existing sidebar if it exists
    var existingSidebar = document.getElementById('customSidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }

    var jobTitle, companyName;

    // Check if the current page is a Naukri job listing
    if (window.location.href.includes('naukri.com/job-listings')) {
        // Extract the job title and company name from the page
        jobTitle = document.querySelector('.styles_jd-header-title__rZwM1').textContent;
        var companyNameElement = document.querySelector('.styles_jd-header-comp-name__MvqAI').textContent;
        companyName = companyNameElement.split('3.')[0]; // This splits the text on '3.' and takes the first part
    }
    // Check if the current page is a LinkedIn job listing
    else if (window.location.href.includes('linkedin.com/jobs/')) {
        // Extract the job title from the page
        jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title-link').textContent;
        // Extract the company name from the page
        var elements = document.getElementsByClassName('job-details-jobs-unified-top-card__primary-description-without-tagline mb2');
        for(var i = 0; i < elements.length; i++){
            var fullText = elements[i].textContent.trim();
            companyName = fullText.split('·')[0].trim(); // This will get the company name
        }
    }

    // Get the current page URL
    var pageUrl = window.location.href;

    // Create a div to hold the job title and company name
    var sideBar = document.createElement('div');
    sideBar.id = 'customSidebar';
    sideBar.style.position = 'fixed';
    sideBar.style.top = '0';
    sideBar.style.bottom = '0';
    sideBar.style.left = '0';
    sideBar.style.width = '200px';
    sideBar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    sideBar.style.padding = '10px';
    sideBar.style.boxShadow = '0px 0px 15px rgba(0,0,0,0.1)';
    sideBar.style.zIndex = '1000';
    sideBar.style.display = 'flex';
    sideBar.style.flexDirection = 'column';
    sideBar.style.justifyContent = 'center';

    // Add job title and its copy button to the div
    var title = document.createElement('p');
    title.textContent = jobTitle;
    title.style.color = '#ffffff'; // White text
    sideBar.appendChild(title);

    var copyTitleButton = document.createElement('button');
    copyTitleButton.textContent = 'Copy Job Title';
    copyTitleButton.style.marginTop = '10px';
    copyTitleButton.style.backgroundColor = '#ffffff'; // White background
    copyTitleButton.style.color = '#000000'; // Black text
    copyTitleButton.onclick = function() {
        navigator.clipboard.writeText(jobTitle);
        copyTitleButton.textContent = 'Copied!';
        setTimeout(function() {
            copyTitleButton.textContent = 'Copy Job Title';
        }, 2000);
    };
    sideBar.appendChild(copyTitleButton);

    // If the company name is available, add it and its copy button to the div
    if (companyName) {
        var company = document.createElement('p');
        company.textContent = companyName;
        company.style.color = '#ffffff'; // White text
        company.style.marginTop = '20px'; // Add some space between the job title and company name
        sideBar.appendChild(company);

        var copyCompanyButton = document.createElement('button');
        copyCompanyButton.textContent = 'Copy Company Name';
        copyCompanyButton.style.marginTop = '10px';
        copyCompanyButton.style.backgroundColor = '#ffffff'; // White background
        copyCompanyButton.style.color = '#000000'; // Black text
        copyCompanyButton.onclick = function() {
            navigator.clipboard.writeText(companyName);
            copyCompanyButton.textContent = 'Copied!';
            setTimeout(function() {
                copyCompanyButton.textContent = 'Copy Company Name';
            }, 2000);
        };
        sideBar.appendChild(copyCompanyButton);
    }

    // Add a button to copy the page URL
    var copyUrlButton = document.createElement('button');
    copyUrlButton.textContent = 'Copy Page URL';
    copyUrlButton.style.marginTop = '10px';
    copyUrlButton.style.backgroundColor = '#ffffff'; // White background
    copyUrlButton.style.color = '#000000'; // Black text
    copyUrlButton.onclick = function() {
        navigator.clipboard.writeText(pageUrl);
        copyUrlButton.textContent = 'Copied!';
        setTimeout(function() {
            copyUrlButton.textContent = 'Copy Page URL';
        }, 2000);
    };
    sideBar.appendChild(copyUrlButton);

    // Add a button to refresh the sidebar
    var refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh';
    refreshButton.style.marginTop = '10px';
    refreshButton.style.backgroundColor = '#ffffff'; // White background
    refreshButton.style.color = '#000000'; // Black text
    refreshButton.onclick = addSidebar;
    sideBar.appendChild(refreshButton);

    // Append the div to the body
    document.body.appendChild(sideBar);
};

// Run the script when the page loads
window.onload = addSidebar;

