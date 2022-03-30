let routeTitle = '', storeTitle = '';

function setTitle() {
    if (!routeTitle && !storeTitle) {
        document.title = "loading..."
    } else if (routeTitle && !storeTitle) {
        document.title = routeTitle;
    } else if (!routeTitle && storeTitle) {
        document.title = routeTitle;
    } else {
        document.title = `${routeTitle}-${storeTitle}`
    }
}



export default {
    setRouteTitle(title) {
        routeTitle = title;
        setTitle();
    },
    setStoreTitle(title) {
        storeTitle = title;
        setTitle();
    }
}