/* Projects -- {
                title: String,
                dateCompleteOriginal: Date,
                dateCompleteCurrent: Date,
                status: string,
                notes: [String, ...]
               } */
Projects = new Meteor.Collection("projects");

// Publish complete set of projects to all clients.
Meteor.publish('projects', function () {
    return Projects.find();
});


StatusTypes = new Meteor.Collection("statusTypes");

Meteor.publish('statusTypes', function () {
    // add each status type only once
    if (StatusTypes.find().count() <= 0) {
        StatusTypes.insert({ Name: "All" });
        StatusTypes.insert({ Name: "On Track" });
        StatusTypes.insert({ Name: "Behind" });
        StatusTypes.insert({ Name: "Delayed" });
    }
    
    return StatusTypes.find();
});