/**
 * searx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * searx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with searx. If not, see < http://www.gnu.org/licenses/ >.
 *
 * (C) 2014 by Thomas Pointhuber, <thomas.pointhuber@gmx.at>
 */

requirejs.config({
    baseUrl: './static/themes/searxr/js',
    paths: {
        app: '../app'
    }
});
;/**
 * searx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * searx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with searx. If not, see < http://www.gnu.org/licenses/ >.
 *
 * (C) 2019 by Alexandre Flament
 */
window.searx = (function(d) {
    'use strict';

    // add data- properties
    var script = d.currentScript  || (function() {
        var scripts = d.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    return {
        autocompleter: script.getAttribute('data-autocompleter') === 'true',
        method: script.getAttribute('data-method')
    };
})(document);
;/**
 * searx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * searx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with searx. If not, see < http://www.gnu.org/licenses/ >.
 *
 * (C) 2014 by Thomas Pointhuber, <thomas.pointhuber@gmx.at>
 */

if(searx.autocompleter) {
    searx.searchResults = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: './autocompleter?q=%QUERY'
    });
    searx.searchResults.initialize();
}

$(document).ready(function(){
    var original_search_value = '';
    if(searx.autocompleter) {
		$("#q").on('keydown', function(e) {
			if(e.which == 13) {
                original_search_value = $('#q').val();
			}
		});
        $('#q').typeahead(null, {
            name: 'search-results',
            displayKey: function(result) {
                return result;
            },
            source: searx.searchResults.ttAdapter()
        });
        $('#q').bind('typeahead:selected', function(ev, suggestion) {
            if(original_search_value) {
                $('#q').val(original_search_value);
            }
            $("#search_form").submit();
        });
    }
});
;/**
 * searx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * searx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with searx. If not, see < http://www.gnu.org/licenses/ >.
 *
 * (C) 2014 by Thomas Pointhuber, <thomas.pointhuber@gmx.at>
 */

$(document).ready(function(){
    /**
     * focus element if class="autofocus" and id="q"
     */
    $('#q.autofocus').focus();

    /**
     * select full content on click if class="select-all-on-click"
     */
    $(".select-all-on-click").click(function () {
        $(this).select();
    });

    /**
     * change text during btn-collapse click if possible
     */
    $('.btn-collapse').click(function() {
        var btnTextCollapsed = $(this).data('btn-text-collapsed');
        var btnTextNotCollapsed = $(this).data('btn-text-not-collapsed');

        if(btnTextCollapsed !== '' && btnTextNotCollapsed !== '') {
            if($(this).hasClass('collapsed')) {
                new_html = $(this).html().replace(btnTextCollapsed, btnTextNotCollapsed);
            } else {
                new_html = $(this).html().replace(btnTextNotCollapsed, btnTextCollapsed);
            }
            $(this).html(new_html);
        }
    });

    /**
     * change text during btn-toggle click if possible
     */
    $('.btn-toggle .btn').click(function() {
        var btnClass = 'btn-' + $(this).data('btn-class');
        var btnLabelDefault = $(this).data('btn-label-default');
        var btnLabelToggled = $(this).data('btn-label-toggled');
        if(btnLabelToggled !== '') {
            if($(this).hasClass('btn-default')) {
                new_html = $(this).html().replace(btnLabelDefault, btnLabelToggled);
            } else {
                new_html = $(this).html().replace(btnLabelToggled, btnLabelDefault);
            }
            $(this).html(new_html);
        }
        $(this).toggleClass(btnClass);
        $(this).toggleClass('btn-default');
    });

        /**
     * change text during btn-toggle click if possible
     */
    $('.media-loader').click(function() {
        var target = $(this).data('target');
        var iframe_load = $(target + ' > iframe');
        var srctest = iframe_load.attr('src');
        if(srctest === undefined || srctest === false){
            iframe_load.attr('src', iframe_load.data('src'));
        }
    });

    /**
     * Select or deselect every categories on double clic
     */
    $(".btn-sm").dblclick(function() {
    var btnClass = 'btn-' + $(this).data('btn-class'); // primary
        if($(this).hasClass('btn-default')) {
            $(".btn-sm > input").attr('checked', 'checked');
            $(".btn-sm > input").prop("checked", true);
            $(".btn-sm").addClass(btnClass);
            $(".btn-sm").addClass('active');
            $(".btn-sm").removeClass('btn-default');
        } else {
            $(".btn-sm > input").attr('checked', '');
            $(".btn-sm > input").removeAttr('checked');
            $(".btn-sm > input").checked = false;
            $(".btn-sm").removeClass(btnClass);
            $(".btn-sm").removeClass('active');
            $(".btn-sm").addClass('btn-default');
        }
    });
    $(".nav-tabs").click(function(a) {
        var tabs = $(a.target).parents("ul");
        tabs.children().attr("aria-selected", "false");
        $(a.target).parent().attr("aria-selected", "true");
    });
});
;window.addEventListener('load', function() {
    // Hide infobox toggle if shrunk size already fits all content.
    $('.infobox').each(function() {
        var infobox_body = $(this).find('.infobox_body');
        var total_height = infobox_body.prop('scrollHeight') + infobox_body.find('img.infobox_part').height();
        var max_height = infobox_body.css('max-height').replace('px', '');
        if (total_height <= max_height) {
            $(this).find('.infobox_toggle').hide();
        }
    });
});
;(function(window, navigator, undefined) {
    var postBuffer = function() {
      var that = this;

      return function(e) {
        var buffer = e.inputBuffer.getChannelData(0);
        
        if (that.audio._transfer) {
          var out = e.outputBuffer.getChannelData(0);

          for (var i = 0; i < 4096; i++) {
            out[i] = buffer[i];
          }
        }

        // Transfer audio to the recognizer
        that.recognizer.postMessage(buffer);
      };
    };

    var initializeAudio = function(audio) {
      audio.context = new (window.AudioContext || window.webkitAudioContext)();
      audio.processor = audio.context.createScriptProcessor(4096, 1, 1);
    };

    var bootstrap = function(pathToDfa, pathToDict, options) {
      var audio = this.audio;
      var recognizer = this.recognizer;
      var terminate = this.terminate;
      
      // Compatibility
      navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

      navigator.getUserMedia(
        { audio: true },
        function(stream) {
          audio.source = audio.context.createMediaStreamSource(stream);
          audio.source.connect(audio.processor);
          audio.processor.connect(audio.context.destination);

          // Bootstrap the recognizer
          recognizer.postMessage({
            type: 'begin',
            pathToDfa: pathToDfa,
            pathToDict: pathToDict,
            options: options
          });
        },
        function(err) {
          terminate();
          console.error('JuliusJS failed: could not capture microphone input.');
        }
      );
    };

    var Julius = function(pathToDfa, pathToDict, options) {
      var that = this;
      options = options || {};

      // The context's nodemap: `source` -> `processor` -> `destination`
      this.audio = {
        // `AudioContext`
        context:   null,
        // `AudioSourceNode` from captured microphone input
        source:    null,
        // `ScriptProcessorNode` for julius
        processor: null,
        _transfer:  options.transfer
      };

      // Do not pollute the object
      delete options.transfer;

      // _Recognition is offloaded to a separate thread to avoid slowing UI_
      this.recognizer = new Worker(options.pathToWorker || 'worker.js');

      this.recognizer.onmessage = function(e) {
        if (e.data.type === 'begin') {
          that.audio.processor.onaudioprocess = postBuffer.call(that);

        } else if (e.data.type === 'recog') {
          if (e.data.firstpass) {
            typeof that.onfirstpass === 'function' &&
              that.onfirstpass(e.data.sentence, e.data.score);
          } else
            typeof that.onrecognition === 'function' &&
              that.onrecognition(e.data.sentence);

        } else if (e.data.type === 'log') {
          typeof that.onlog === 'function' &&
            that.onlog(e.data.sentence);

        } else if (e.data.type === 'error') {
          console.error(e.data.error);
          that.terminate();

        } else {
          console.info('Unexpected data received from julius:');
          console.info(e.data);
        }
      };

      initializeAudio(this.audio);
      bootstrap.call(this, pathToDfa, pathToDict, options);
    };

    Julius.prototype.onfirstpass = function(sentence) { /* noop */ };
    Julius.prototype.onrecognition = function(sentence, score) { /* noop */ };
    Julius.prototype.onlog = function(obj) { console.log(obj); };
    Julius.prototype.onfail = function() { /* noop */ };
    Julius.prototype.terminate = function(cb) {
      this.audio.processor.onaudioprocess = null;
      this.recognizer.terminate();
      console.error('JuliusJS was terminated.');
      typeof this.onfail === 'function' && this.onfail();
    };

    window.Julius = Julius;
}(window,window.navigator) );
;/**
 * searx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * searx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with searx. If not, see < http://www.gnu.org/licenses/ >.
 *
 * (C) 2014 by Thomas Pointhuber, <thomas.pointhuber@gmx.at>
 */

$(document).ready(function(){
    $(".searx_overpass_request").on( "click", function( event ) {
        var overpass_url = "https://overpass-api.de/api/interpreter?data=";
        var query_start = overpass_url + "[out:json][timeout:25];(";
        var query_end = ");out meta;";

        var osm_id = $(this).data('osm-id');
        var osm_type = $(this).data('osm-type');
        var result_table = $(this).data('result-table');
        var result_table_loadicon = "#" + $(this).data('result-table-loadicon');

        // tags which can be ignored
        var osm_ignore_tags = [ "addr:city", "addr:country", "addr:housenumber", "addr:postcode", "addr:street" ];

        if(osm_id && osm_type && result_table) {
            result_table = "#" + result_table;
            var query = null;
            switch(osm_type) {
                case 'node':
                    query = query_start + "node(" + osm_id + ");" + query_end;
                    break;
                case 'way':
                    query = query_start + "way(" + osm_id + ");" + query_end;
                    break;
                case 'relation':
                    query = query_start + "relation(" + osm_id + ");" + query_end;
                    break;
                default:
                    break;
            }
            if(query) {
                //alert(query);
                var ajaxRequest = $.ajax( query )
                .done(function( html) {
                    if(html && html.elements && html.elements[0]) {
                        var element = html.elements[0];
                        var newHtml = $(result_table).html();
                        for (var row in element.tags) {
                            if(element.tags.name === null || osm_ignore_tags.indexOf(row) == -1) {
                                newHtml += "<tr><td>" + row + "</td><td>";
                                switch(row) {
                                    case "phone":
                                    case "fax":
                                        newHtml += "<a href=\"tel:" + element.tags[row].replace(/ /g,'') + "\">" + element.tags[row] + "</a>";
                                        break;
                                    case "email":
                                        newHtml += "<a href=\"mailto:" + element.tags[row] + "\">" + element.tags[row] + "</a>";
                                        break;
                                    case "website":
                                    case "url":
                                        newHtml += "<a href=\"" + element.tags[row] + "\">" + element.tags[row] + "</a>";
                                        break;
                                    case "wikidata":
                                        newHtml += "<a href=\"https://www.wikidata.org/wiki/" + element.tags[row] + "\">" + element.tags[row] + "</a>";
                                        break;
                                    case "wikipedia":
                                        if(element.tags[row].indexOf(":") != -1) {
                                            newHtml += "<a href=\"https://" + element.tags[row].substring(0,element.tags[row].indexOf(":")) + ".wikipedia.org/wiki/" + element.tags[row].substring(element.tags[row].indexOf(":")+1) + "\">" + element.tags[row] + "</a>";
                                            break;
                                        }
                                    /* jshint ignore:start */
                                    default:
                                    /* jshint ignore:end */
                                        newHtml += element.tags[row];
                                        break;
                                }
                                newHtml += "</td></tr>";
                            }
                        }
                        $(result_table).html(newHtml);
                        $(result_table).removeClass('hidden');
                        $(result_table_loadicon).addClass('hidden');
                    }
                })
                .fail(function() {
                    $(result_table_loadicon).html($(result_table_loadicon).html() + "<p class=\"text-muted\">"+could_not_load+"</p>");
                });
            }
        }

        // this event occour only once per element
        $( this ).off( event );
    });

    $(".searx_init_map").on( "click", function( event ) {
        var leaflet_target = $(this).data('leaflet-target');
        var map_lon = $(this).data('map-lon');
        var map_lat = $(this).data('map-lat');
        var map_zoom = $(this).data('map-zoom');
        var map_boundingbox = $(this).data('map-boundingbox');
        var map_geojson = $(this).data('map-geojson');

        require(['leaflet-0.7.3.min'], function(leaflet) {
            if(map_boundingbox) {
                southWest = L.latLng(map_boundingbox[0], map_boundingbox[2]);
                northEast = L.latLng(map_boundingbox[1], map_boundingbox[3]);
                map_bounds = L.latLngBounds(southWest, northEast);
            }

            // TODO hack
            // change default imagePath
            L.Icon.Default.imagePath =  "./static/themes/searxr/img/map";

            // init map
            var map = L.map(leaflet_target);

            // create the tile layer with correct attribution
            var osmMapnikUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmMapnikAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            var osmMapnik = new L.TileLayer(osmMapnikUrl, {minZoom: 1, maxZoom: 19, attribution: osmMapnikAttrib});

            var osmWikimediaUrl='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
            var osmWikimediaAttrib = 'Wikimedia maps beta | Maps data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            var osmWikimedia = new L.TileLayer(osmWikimediaUrl, {minZoom: 1, maxZoom: 19, attribution: osmWikimediaAttrib});

            // init map view
            if(map_bounds) {
                // TODO hack: https://github.com/Leaflet/Leaflet/issues/2021
                setTimeout(function () {
                    map.fitBounds(map_bounds, {
                        maxZoom:17
                    });
                }, 0);
            } else if (map_lon && map_lat) {
                if(map_zoom)
                    map.setView(new L.LatLng(map_lat, map_lon),map_zoom);
                else
                    map.setView(new L.LatLng(map_lat, map_lon),8);
            }

                map.addLayer(osmMapnik);

                var baseLayers = {
             "OSM Mapnik": osmMapnik/*,
             "OSM Wikimedia": osmWikimedia*/
            };

            L.control.layers(baseLayers).addTo(map);


            if(map_geojson)
                L.geoJson(map_geojson).addTo(map);
            /*else if(map_bounds)
                L.rectangle(map_bounds, {color: "#ff7800", weight: 3, fill:false}).addTo(map);*/
        });

        // this event occour only once per element
        $( this ).off( event );
    });
});
;$(document).ready(function(){
    $("#allow-all-engines").click(function() {
        $(".onoffswitch-checkbox").each(function() { this.checked = false;});
    });

    $("#disable-all-engines").click(function() {
        $(".onoffswitch-checkbox").each(function() { this.checked = true;});
    });
});

