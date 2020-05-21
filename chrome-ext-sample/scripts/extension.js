chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    chrome.runtime.sendMessage({action:'getCandidates', "tabId": tabs[0].id}, function(data){
        let htmlPopup = "";
        if(data && data.length) {
            data.forEach((candidate, index) => {
                htmlPopup += index ? "<hr/>" : "";
                htmlPopup += "<h4>" + candidate.first_name + " <strong>" + candidate.last_name + "</strong></h4>"
                if(!candidate.result_candidacy) {
                    htmlPopup += "<p><strong>Le candidat n'a pas d'étape de candidature</strong></p>"
                } else {
                    htmlPopup += "<p><strong>créateur de la fiche :</strong> " + candidate.update_user + "</p>"
                    htmlPopup += "<p><strong>date de dernière modification :</strong> " + new Date(candidate.update_date).toLocaleString() + "</p>"
                    htmlPopup += "<p><strong>dernière étape de candidature :</strong> " + candidate.type_candidcay + "</p>"
                    htmlPopup += "<p><strong>resultat :</strong> " + candidate.result_candidacy + "</p>"
                    htmlPopup += "<p><strong>commentaire :</strong> " + candidate.comment + "</p>"
                }
                htmlPopup += "<a href='http://google.com/" + candidate.candidate_id + "/" + candidate.candidacy_id + "' target='_blank'><button>Voir la fiche du candidat</button></a>"
            });
        } else {
            htmlPopup = "<h4>Aucun candidat n'a été trouvé en base de données</h4>"
        }
        $('#context').append(htmlPopup);
    });
});