const Time = (props) => {
    const date = new Date(props.tstamp); // necessary because Date uses MILLISECONDS instead of seconds

    if (props.notime) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
    // keep in mind the solution for displaying hours and minutes over there!
        
}
 
export default Time;