const initState = {
    album_name_list: {},
    albums_songs: [],
    albums_array: [],
    PlayList: '',
    PlaListInfo : '',
    shortAlbum: false,
    longAlbum: false,
    profile_info: '',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST_INFO":
            return {
                PlaListInfo: action.data
            };
        case "ADD_PLAYLIST":
            return {
                PlayList: action.data
            };
        case "ADD_ALBUM":
            return {
                ...state,
                albums_array: [...state.albums_array, action.data]
            };
        case "EDIT_SHORT_ALBUM":
            return {
                ...state,
                shortAlbum: true
            };
        case "EDIT_LONG_ALBUM":
            return {
                ...state,
                longAlbum: true
            };
        case "ADD_SONG_ALBUM":
            return {
                ...state,
                albums_songs: [...state.albums_songs, action.data]
            };
        case "ADD_PROFILE_INFO":
            return {
                    ...state,
                    profile_info: action.data
            };
        case "ADD_ALBUM_NAME_LIST":
            return {
                ...state,
                album_name_list: {...state.album_name_list, ...action.data}
            };
        case "UPDATE_ALBUM_NAME_LIST":
            for (let row in state.album_name_list) {
                if (parseInt(row) === parseInt(action.data)) {
                    state.album_name_list[row] = true
                }
            }
            return {
                ...state,
                album_name_list: {...state.album_name_list}
            };
        default:
            return state;
    }
};

export default rootReducer;
