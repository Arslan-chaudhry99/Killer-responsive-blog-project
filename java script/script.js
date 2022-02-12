function openmenu(){
document.getElementById('open-side-menu').style.width='150px'
}
function closemenu(){
    document.getElementById('open-side-menu').style.width='0px'
}
function opensearch(){
  let a=  document.getElementById('rp-menu-id');
  let b=  document.getElementById('form-input-id');
//  let c= document.getElementById('search')
//  let d=document.getElementById('search-minus')

if (a.style.display === 'flex')
{
    document.getElementById('rp-menu-id').style.display='none';
    document.getElementById('form-input-id').style.display='flex';
    document.getElementById('search').style.display='none';
    document.getElementById('search-minus').style.display='block';
}
else{
    document.getElementById('rp-menu-id').style.display='flex'
    document.getElementById('form-input-id').style.display='none'
    document.getElementById('search').style.display='block';
    document.getElementById('search-minus').style.display='none';
}

}
// function opensearch(){
//     document.getElementById('rp-menu-id').style.display='none'
// }