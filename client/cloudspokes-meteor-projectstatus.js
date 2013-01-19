// Client side javascript
Projects = new Meteor.Collection("projects");

Session.set('editing_title', null);
Session.set('editing_dateOrig', null);
Session.set('editing_dateCur', null);
Session.set('editing_status', null);
Session.set('editing_notes', null);

// Subscribe to 'projects' collection on startup.
Meteor.subscribe('projects');

/* Helpers for in-place editing */

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
    var ok = callbacks.ok || function () { };
    var cancel = callbacks.cancel || function () { };

    var events = {};
    events['keyup ' + selector + ', keydown ' + selector + ', focusout ' + selector] =
      function (evt) {
          if (evt.type === "keydown" && evt.which === 27) {
              // escape = cancel
              cancel.call(this, evt);

          } else if (evt.type === "keyup" && evt.which === 13 ||
                     evt.type === "focusout") {
              // blur/return/enter = ok/submit if non-empty
              var value = String(evt.target.value || "");
              if (value)
                  ok.call(this, value, evt);
              else
                  cancel.call(this, evt);
          }
      };
    return events;
};

var activateInput = function (input) {
    input.focus();
    input.select();
};


/* END Helpers for in-place editing */

Template.projectList.hasProjects = function () {
    return Projects.find().count() > 0;
};

Template.projectList.ProjectArray = function () {
    return Projects.find({}, { sort: { Title: 1 } });
};

Template.projectList.editingTitle = function () { return Session.equals('editing_title', this._id); };
Template.projectList.editingDateOrig = function () { return Session.equals('editing_dateOrig', this._id); };
Template.projectList.editingDateCur = function () { return Session.equals('editing_dateCur', this._id); };
Template.projectList.editingStatus = function () { return Session.equals('editing_status', this._id); };
Template.projectList.editingNotes = function () { return Session.equals('editing_notes', this._id); };


Template.projectList.events({
    'dblclick .display .pTitle': function (evt, tmpl) {
        Session.set('editing_title', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pTitle"));
    },
    'dblclick .display .pDateOrig': function (evt, tmpl) {
        Session.set('editing_dateOrig', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pDateOrig"));
    },
    'dblclick .display .pDateCur': function (evt, tmpl) {
        Session.set('editing_dateCur', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pDateCur"));
    },
    'dblclick .display .pStatus': function (evt, tmpl) {
        Session.set('editing_status', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pStatus"));
    },
    'dblclick .display .pNotes': function (evt, tmpl) {
        Session.set('editing_notes', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pNotes"));
    }
});


Template.projectList.events(okCancelEvents(
  '#pTitle',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { Title: value } });
          Session.set('editing_title', null);
      },
      cancel: function () { Session.set('editing_title', null); }
  })
);

Template.projectList.events(okCancelEvents(
  '#pDateOrig',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { DateCompleteOrig: value } });
          Session.set('editing_dateOrig', null);
      },
      cancel: function () { Session.set('editing_dateOrig', null); }
  })
);

Template.projectList.events(okCancelEvents(
  '#pDateCur',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { DateCompleteCur: value } });
          Session.set('editing_dateCur', null);
      },
      cancel: function () { Session.set('editing_dateCur', null); }
  })
);

Template.projectList.events(okCancelEvents(
  '#pStatus',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { Status: value } });
          Session.set('editing_status', null);
      },
      cancel: function () { Session.set('editing_status', null); }
  })
);

Template.projectList.events(okCancelEvents(
  '#pNotes',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { Notes: value } });
          Session.set('editing_notes', null);
      },
      cancel: function () { Session.set('editing_notes', null); }
  })
);

function createNewProject() {
    Projects.insert({
        Title: "A New Project", DateCompleteOrig: "1/1/2013", DateCompleteCur: "1/1/2013", Status: "On Track", Notes: "New note."
    });
};