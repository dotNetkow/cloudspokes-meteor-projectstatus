// Client side javascript
Projects = new Meteor.Collection("projects");

// When editing project title, ID of the project
Session.set('editing_itemname', null);

// Subscribe to 'projects' collection on startup.
Meteor.subscribe('projects');

Template.projectList.ProjectArray = function () {
    return Projects.find({}, { sort: { Name: 1 } });
};

Template.projectList.editing = function () {
    return Session.equals('editing_itemname', this._id);
};

Template.projectList.events({
    /*'click .display' : function (event) {
        alert('hi');

    },*/

    'dblclick .display': function (evt, tmpl) {
        //alert('hey');
        Session.set('editing_itemname', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pTitle"));
    }

});

if (Meteor.isClient) {
    Meteor.startup(function () {
        // code to run on client at startup
    });

  /*
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/
}
