// Client side javascript
Projects = new Meteor.Collection("projects");

// Subscribe to 'projects' collection on startup.
Meteor.subscribe('projects');

Template.projectList.ProjectArray = function () {
    return Projects.find({}, { sort: { Name: 1 } });
};

Template.projectList.events = {
    'click input': function () {

    }

};

if (Meteor.isClient) {
    Meteor.startup(function () {
        // code to run on client at startup
    });

  /*Template.hello.greeting = function () {
    return "Welcome to cloudspokes-meteor-projectstatus.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
