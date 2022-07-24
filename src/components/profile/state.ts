import { ref } from "vue";

const showProfile = ref(false);

const useProfile = () => {
  const toggleProfile = () => {
    showProfile.value = !showProfile.value;
  };

  return { showProfile, toggleProfile };
};

export default useProfile;
