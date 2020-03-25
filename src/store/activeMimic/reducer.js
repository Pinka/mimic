
export const initialState = {
    name: 'Untitled'
};

export const reducer = (state, action) => {

    switch (action.type) {
        case 'SetMimicName':
            state = {
                name: action.payload
            };
            break;
        default:
            break;
    }

    return state;
}
