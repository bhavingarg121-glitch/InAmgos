<script>
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(
'.project-card,.stat-card,.credentials div'
).forEach((el)=>{
    el.style.opacity='0';
    el.style.transform='translateY(30px)';
    el.style.transition='all .8s ease';
    observer.observe(el);
});
</script>
