import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import { useEffect } from 'react';

const UserProfilePage = () => {
  const { registeredUserData } = useAppSelector((store) => store.Auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const UserData = localStorage.getItem('registeredUserData');
    if (UserData) dispatch(getRegisteredUserData(JSON.parse(UserData)));
  }, []);
  return (
    <Card className="userProfile">
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {registeredUserData?.userName.slice(0, 1)}
          </Avatar>
        )}
        title={registeredUserData?.userName}
        subheader={registeredUserData?.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Возраст -
          {registeredUserData?.userAge}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пол -
          {registeredUserData?.userGender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Chip icon={<LocationCityIcon />} label={registeredUserData?.userCity} variant="outlined" />
      </CardActions>
    </Card>
  );
};
export default UserProfilePage;
