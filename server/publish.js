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