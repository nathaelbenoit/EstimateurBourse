// Dark Mode Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const themeIcon = document.querySelector('.theme-toggle i');
    if (newTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Load theme preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (savedTheme === 'dark' && themeIcon) {
        themeIcon.className = 'fas fa-sun';
    }
});

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Retour au haut');
    scrollToTopBtn.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14l5-5 5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    document.body.appendChild(scrollToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Format currency helper
function formatEuro(montant) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(montant);
}

// Global chart variable
let comparisonChart = null;

// Calculate scenario helper function
function calculerScenario(montantInitial, tauxInteret, montantMensuel, nbAnnees) {
    let capital = montantInitial;
    let totalVersements = montantInitial;
    const evolution = [capital];
    const versements = [montantInitial];

    for (let annee = 1; annee <= nbAnnees; annee++) {
        // Calcul mensuel pour plus de précision
        for (let mois = 1; mois <= 12; mois++) {
            const interetsMois = capital * (tauxInteret / 12);
            capital += interetsMois;
            capital += montantMensuel;
        }
        totalVersements += montantMensuel * 12;
        evolution.push(capital);
        versements.push(totalVersements);
    }

    return { evolution, versements, capital, totalVersements };
}

// Main calculation function
function calculer() {
    // Récupération des valeurs - Scénario principal
    const montantInitial = parseFloat(document.getElementById('montantInitial').value) || 0;
    const tauxInteret = parseFloat(document.getElementById('tauxInteret').value) / 100 || 0;
    const montantMensuel = parseFloat(document.getElementById('montantMensuel').value) || 0;
    const nbAnnees = parseInt(document.getElementById('nbAnnees').value) || 0;

    // Scénario 1
    const montantInitial1 = parseFloat(document.getElementById('montantInitial1').value) || 0;
    const tauxInteret1 = parseFloat(document.getElementById('tauxInteret1').value) / 100 || 0;
    const montantMensuel1 = parseFloat(document.getElementById('montantMensuel1').value) || 0;

    // Calcul scénario principal
    let capital = montantInitial;
    let totalVersements = montantInitial;
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const evolutionAnnuelle = [];

    for (let annee = 1; annee <= nbAnnees; annee++) {
        let interetsAnnuels = 0;
        let versementsAnnuels = montantMensuel * 12;

        // Calcul mensuel pour plus de précision
        for (let mois = 1; mois <= 12; mois++) {
            // Intérêts du mois
            const interetsMois = capital * (tauxInteret / 12);
            interetsAnnuels += interetsMois;
            capital += interetsMois;

            // Ajout du versement mensuel
            capital += montantMensuel;
        }

        totalVersements += versementsAnnuels;

        evolutionAnnuelle.push({
            annee: annee,
            versements: totalVersements,
            interets: capital - totalVersements,
            total: capital
        });

        // Ajout dans le tableau
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td class="text-start fw-semibold">${annee}</td>
            <td class="currency text-end">${formatEuro(totalVersements)}</td>
            <td class="currency text-end">${formatEuro(capital - totalVersements)}</td>
            <td class="currency text-end" style="color: var(--primary-color);">${formatEuro(capital)}</td>
        `;
    }

    const valeurFinale = capital;
    const interetsGagnes = valeurFinale - totalVersements;
    const rendementTotal = totalVersements > 0 ? ((interetsGagnes / totalVersements) * 100) : 0;

    // Affichage des résultats
    document.getElementById('valeurFinale').textContent = formatEuro(valeurFinale);
    document.getElementById('totalInvesti').textContent = formatEuro(totalVersements);
    document.getElementById('interetsGagnes').textContent = formatEuro(interetsGagnes);
    document.getElementById('rendementTotal').textContent = rendementTotal.toFixed(1) + '%';

    // Calcul des scénarios de comparaison
    const scenario1 = calculerScenario(montantInitial1, tauxInteret1, montantMensuel1, nbAnnees);
    const scenarioPrincipal = calculerScenario(montantInitial, tauxInteret, montantMensuel, nbAnnees);
    const scenarioPrincipalScaled = {
        evolution: scenarioPrincipal.evolution.map(v => v * 0.828)
    };

    // Création du graphique de comparaison
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    // Détruire le graphique existant s'il y en a un
    if (comparisonChart) {
        comparisonChart.destroy();
    }

    const ageActuel = 19;
    const anneeActuelle = 2025;
    const labels = Array.from({ length: nbAnnees + 1 }, (_, i) => `${ageActuel + i} ans (${anneeActuelle + i})`);

    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Scénario Principal',
                    data: scenarioPrincipal.evolution,
                    borderColor: '#743db6',
                    backgroundColor: 'rgba(116, 61, 182, 0.12)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Après prélèvements sociaux',
                    data: scenarioPrincipalScaled.evolution,
                    borderColor: '#F5276C',
                    backgroundColor: 'rgba(245, 39, 108, 0.10)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    hidden: true
                },
                {
                    label: 'Versements Principal',
                    data: scenarioPrincipal.versements,
                    borderColor: '#743db6',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Second Scénario',
                    data: scenario1.evolution,
                    borderColor: '#4dd4bf',
                    backgroundColor: 'rgba(77, 212, 191, 0.12)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    hidden: true
                },
                {
                    label: 'Versements Second Scénario',
                    data: scenario1.versements,
                    borderColor: '#4dd4bf',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    hidden: true,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatEuro(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatEuro(value);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });

    // Afficher la section résultats
    document.getElementById('results').classList.add('show');

    // Scroll to results
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Calculer automatiquement au chargement de la page
window.addEventListener('load', calculer);
