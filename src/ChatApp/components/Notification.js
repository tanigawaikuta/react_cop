function Notification({ state }) {
    return (
        <div>
            <p>{state.caller} is calling</p>
        </div>
    );
};

export default Notification;
