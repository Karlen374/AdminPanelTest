import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';
import Modal from 'src/components/modal/modal';
import SignUpForm from 'src/components/signUpForm/SignUpForm';
import SignInForm from 'src/components/signInForm/signInForm';
import { useAppSelector } from 'src/hooks/hooks';
import AppAlert from './appAlert';
import styles from './appHeader.module.scss';
import AppHeaderAvatar from './appHeaderAvatar';

const AppHeader = () => {
  const { signUpModal, signInModal } = useAppSelector((store) => store.Auth);
  return (
    <>
      <AppAlert />
      <Modal active={signUpModal}>
        <SignUpForm />
      </Modal>
      <Modal active={signInModal}>
        <SignInForm />
      </Modal>
      <header className={styles.header}>
        <div className={styles.header_buttons}>
          <AppsIcon className={styles.header_appsIcon} sx={{ color: '#A1A1AA' }} />
          <ReplyIcon className={styles.header_replyIcon} sx={{ color: '#A1A1AA' }} />
          <button type="button" className={styles.header__button_active}>Просмотр</button>
          <button type="button" className={styles.header__button}>Управление</button>
        </div>
        <AppHeaderAvatar />
      </header>
    </>
  );
};
export default AppHeader;
