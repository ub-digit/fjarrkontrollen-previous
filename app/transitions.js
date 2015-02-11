export default function(){
	this.transition(
	  this.fromRoute('fjarr-in.list'),
	  this.toRoute('fjarr-in.post'),
	  this.use('toLeft', {duration: 300}),
	  this.reverse('toRight', {duration: 300})
	);
	
	this.transition(
	  this.fromRoute('login'),
	  this.toRoute('fjarr-in'),
	  this.use('toLeft', {duration: 300}),
	  this.reverse('toRight', {duration: 300})
	);
}