
//=====================
// Projecte

var Projecte = function(id, name, lat, lng, zoom, readonly, m){
  this.id = id;
  this.name = name;
  this.status = "define";
  this.latitude = lat;
  this.longitude = lng;
  this.zoom = zoom;
  this.readonly = readonly;
  this.map_parent = m;
};

Projecte.prototype.save = function (){
  var that = this;
  strUrl = this.map_parent.serverUrl + "/project";
  console.log('API call: ' + strUrl);
  var data = {}
  var prop = [ "name", "status", "latitude", "longitude", "zoom" ];
  prop.forEach(function(item) {
      if (that[item])
        data[item] = that[item];
  });
  if (this.id == 0 || this.id == null) {
    $.post( strUrl, JSON.stringify(data))
      .done(function( data ) {
        that.map_parent.notify("Updated!");
        that.id = data.id;
      }, "json");
  } else {
    $.put( strUrl+"/"+this.id, JSON.stringify(data))
      .done(function( data ) {
        that.map_parent.notify("Updated!");
      }, "json");
  }
};
Projecte.prototype.delete = function(){
  var that = this;
  this.map_parent.question("Voleu esborrar el projecte " + this.name + "?", function(type) {
    //Callback
    if (type === "button_yes") {
      strUrl = that.map_parent.serverUrl + "/project";
      console.log('API call: ' + strUrl);
      if (that.id == 0 || that.id == null) {
        console.log("Can not delete project without id.");
      } else {
        $.delete( strUrl+"/"+that.id, JSON.stringify({ "id": that.id }))
          .done(function( data ) {
            that.map_parent.notify("Delete!");
            // We reload projects
            that.map_parent.loadProjects();
          }, "json");
      }
    }
  });
};

module.exports = Projecte;
