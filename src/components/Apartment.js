import { hover } from '@testing-library/user-event/dist/hover';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AptModal from './AptModal';
import '../App.css'
import * as Icon from 'react-bootstrap-icons';
import { useDbData, useDbUpdate, useAuthState } from '../utilities/firebase';

const Apartment = ({ data, index, ifLiked, interestAdd, setInterestAdd}) => {

  const user = useAuthState()[0];
  const userEmail = user?.email.split("@")[0];
  const [likesByUser] = useDbUpdate(`/${userEmail}/likedApts`);
  const [apts] = useDbData(`/${userEmail}/likedApts`);

  const clickLike = () => {
    let arr = [];
    if (apts) {
      for (let i = 0; i < apts.index.length; i++) {
        arr.push(apts.index[i]);
      }
    }
    console.log(ifLiked)
    if (ifLiked === false) {
      arr.push(index);
      likesByUser({ index: arr });
    } else {
      arr = arr.filter((ele) => ele !== index);
      likesByUser({ index: arr });
    }
  }

  return (
    <div>
      <Card
        style={{
          width: '20rem',
          height: '21rem',
          float: 'left',
          margin: '10px',
          borderRadius: '20px 20px 20px 20px',
          boxShadow: '4px 4px 4px 0px rgb(0,0,0,0.3)',

        }}
      >
        <div style={{ width: "100%", height: "230px" }}>
          <Card.Img
            variant="top"
            src={data.img}
            style={{ width: "100%", height: "200px", borderRadius: '20px 20px 0px 0px', }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{data.name}</div>
              {user && <div style={{ marginLeft: "auto", marginRight: "0" }} onClick={() => {
                clickLike();
              }}> {ifLiked === false ?
                <Icon.SuitHeart />
                :
                <Icon.SuitHeartFill color="red" />
                }
              </div>}
            </div>
          </Card.Title>
          <Card.Text>
            <div style={{ display: "inline-block", float: "left" }}>
              ${data.rent} | {data.bedrooms}bd | {data.bathrooms}ba |{" "}
              {data.dimensions} |
            </div>
          </Card.Text>
          <AptModal data={data} interestAdd={interestAdd} setInterestAdd={setInterestAdd}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Apartment;
