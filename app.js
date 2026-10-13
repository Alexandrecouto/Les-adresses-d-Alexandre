document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('article[data-type]').forEach(a=>a.hidden=b.dataset.filter!=='all'&&a.dataset.type!==b.dataset.filter)}));
document.querySelector('#enquiry').addEventListener('submit',event=>{
 event.preventDefault();
 const property=document.querySelector('#property').value;
 const name=document.querySelector('#name').value.trim();
 const message=document.querySelector('#message').value.trim();
 const subject='Demande de renseignements — '+property;
 const body=`Bonjour Alexandre,\n\nJe vous contacte au sujet de : ${property}.\n\n${message}\n\nMerci pour votre retour,\n${name}`;
 document.querySelector('#mail-status').hidden=false;
 window.location.href='mailto:alexandrefernandescouto@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});

const details={
 studio:{city:'LYON 9ᵉ · COURT SÉJOUR',title:'Le Studio de l’Horloge',description:'Un studio pour découvrir Lyon ou y revenir régulièrement, le temps de quelques nuits. Découvrez sa présentation et les informations pratiques sur le site dédié.',facts:['Studio','Lyon 9ᵉ','Court séjour'],image:'assets/studio-horloge.jpg',alt:'Studio de l’Horloge avec son escalier en bois et son mur rouge',url:'https://alexandrecouto.github.io/studiodelhorloge/',label:'En savoir plus'},
 coloc:{city:'SAINT-ÉTIENNE · COLOCATION',title:'Colocation à Saint-Étienne',description:'Un appartement meublé de 128 m² prévu pour cinq colocataires, avec des espaces communs pour se retrouver. Explorez le logement et ses pièces grâce à la visite virtuelle.',facts:['128 m²','5 chambres','Colocation meublée'],image:'assets/saint-etienne.jpg',alt:'Salon et salle à manger de la colocation à Saint-Étienne',url:'https://alexandrecouto.github.io/Visite-360/',label:'Visite à 360°'}
};
const modal=document.querySelector('#detail');
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 const d=details[button.dataset.detail];
 modal.dataset.property=button.dataset.detail;
 document.querySelector('#detail-city').textContent=d.city;
 document.querySelector('#detail-title').textContent=d.title;
 document.querySelector('#detail-description').textContent=d.description;
 const image=document.querySelector('#detail-image');image.src=d.image;image.alt=d.alt;
 document.querySelector('#detail-facts').replaceChildren(...d.facts.map(text=>{const span=document.createElement('span');span.textContent=text;return span}));
 const link=document.querySelector('#detail-more');link.href=d.url;link.textContent=d.label;
 modal.showModal();modal.scrollTop=0;
 document.body.classList.add("modal-open");
}));
document.querySelector('#detail .close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close()}});

modal.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.querySelector('#detail-contact').addEventListener('click',()=>{
 document.querySelector('#property').selectedIndex=modal.dataset.property==='studio'?0:1;
 modal.close();
 document.querySelector('#name').focus({preventScroll:true});
 document.querySelector('#contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
