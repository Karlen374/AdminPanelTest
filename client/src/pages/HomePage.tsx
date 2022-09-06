import React, { useEffect } from 'react';
import AppSubHeader from 'src/components/appSubHeader/appSubHeader';
import NavTable from 'src/components/navTable/navTable';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import ComponentTable from 'src/components/componentTable/componentTable';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';

const HomePage = () => {
  const { registeredUserData } = useAppSelector((store) => store.Auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const UserData = localStorage.getItem('registeredUserData');
    if (UserData) dispatch(getRegisteredUserData(JSON.parse(UserData)));
  }, []);
  const content = registeredUserData ? (
    <div className="appData">
      <NavTable />
      <ComponentTable />
    </div>
  ) : <h1 className="regMessage">Зарегистрируйтесь для полного доступа</h1>;
  return (
    <div>
      <AppSubHeader />
      {content}
    </div>
  );
};
export default HomePage;
