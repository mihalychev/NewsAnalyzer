export default function loading(isLoading, status = true) {
  if (isLoading) {
    document.querySelector('.results__content').classList.add('hidden')
    document.querySelector('.preloader').classList.remove('hidden');
  } if (!isLoading && status) {
    document.querySelector('.preloader').classList.add('hidden')
    document.querySelector('.results__content').classList.remove('hidden')
  } if(!isLoading && !status) {
    document.querySelector('.preloader').classList.add('hidden')
    document.querySelector('.results__content').classList.add('hidden')
    document.querySelector('.not-found').classList.remove('hidden')
  }
}