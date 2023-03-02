const Popup = ({data}) => {
    return (
        <div>
            <ul>
                <li>{data.rent}</li>
                <li>{data.dimensions}</li>
                <li>{data.utilities}</li>
                <li>{data.bedrooms}</li>
                <li>{data.bathrooms}</li>
                <li>{data.laundry}</li>
                <li>{data.parking}</li>
            </ul>
            

        </div>
    );
}
export default Popup;