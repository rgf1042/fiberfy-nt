<template>
    <div>
        <leaflet-map
            :status="status"
            :layerActive="layerActive"
            v-on:edit-site="editSite($event)"
            v-on:edit-path="editPath($event)"
            v-on:edit-boxes="editBoxes($event)"
            v-on:edit-cable="editCable($event)"
            v-on:edit-fusions="editFusions($event)"
            v-on:active-path="setActivePath($event)"
        ></leaflet-map>
        <map-controls
            v-on:set-status="setStatus($event)"
            v-on:set-layer="setLayer($event)"
            :status="status"
            :layerActive="layerActive"
            :activePath="activePath"
        ></map-controls>
    </div>
</template>

<script>
/* eslint-disable */
import L from 'leaflet';
import LeafletMap from '@/components/FiberMap/leaflet-map';
import MapControls from '@/components/FiberMap/map-controls';

export default {
    name: 'FiberMap',
    components: {
        'leaflet-map': LeafletMap,
        'map-controls': MapControls,
    },
    data() {
        return {
            status: '',
            activePath: false,
        };
    },
    computed: {
        layerActive() {
            return this.$store.getters['projects/map/currentLayer'];
        },
    },
    methods: {
        setStatus(status) {
            this.status = status;
            this.activePath = false;
        },
        setLayer(layer) {
            this.$store.dispatch('projects/map/setLayer', layer);
            this.status = '';
            this.activePath = false;
        },
        setActivePath(active) {
            this.activePath = active;
        },
        editSite(id) {
            this.$router.push({ name: 'SiteEdit', params: { id: id } });
        },
        editPath(id) {
            this.$router.push({ name: 'PathEdit', params: { id: id } });
        },
        editBoxes(id) {
            this.$router.push({ name: 'BoxesEdit', params: { id: id } });
        },
        editFusions(id) {
            this.$router.push({ name: 'FusionsEdit', params: { id: id } });
        },
        editCable(id) {
            this.$router.push({ name: 'CableEdit', params: { id: id } });
        },
    },
};
</script>
