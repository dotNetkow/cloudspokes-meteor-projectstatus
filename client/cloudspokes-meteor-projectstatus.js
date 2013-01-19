// Client side javascript
Projects = new Meteor.Collection("projects");

Session.set('editing_title', null);
Session.set('editing_status', null);

// Subscribe to 'projects' collection on startup.
Meteor.subscribe('projects');

////////// Helpers for in-place editing //////////

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

/////////////////////////

Template.projectList.ProjectArray = function () {
    return Projects.find({}, { sort: { Title: 1 } });
};

Template.projectList.editingTitle = function () { return Session.equals('editing_title', this._id); };
Template.projectList.editingStatus = function () { return Session.equals('editing_status', this._id); };


Template.projectList.events({
    'dblclick .display .pTitle': function (evt, tmpl) {
        console.log('title');
        Session.set('editing_title', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pTitle"));
    },

    'dblclick .display .pStatus': function (evt, tmpl) {
        console.log('status');
        Session.set('editing_status', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#pStatus"));
    }
});


Template.projectList.events(okCancelEvents(
  '#pTitle',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { Title: value } });
          Session.set('editing_title', null);
      },
      cancel: function () {
          Session.set('editing_title', null);
      }
  })
);

Template.projectList.events(okCancelEvents(
  '#pStatus',
  {
      ok: function (value) {
          Projects.update(this._id, { $set: { Status: value } });
          Session.set('editing_status', null);
      },
      cancel: function () {
          Session.set('editing_status', null);
      }
  })
);

if (Meteor.isClient) {
    Meteor.startup(function () {
        // code to run on client at startup
    });
}
