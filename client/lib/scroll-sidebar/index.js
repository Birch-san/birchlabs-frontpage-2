require('bootstrap/dist/js/umd/scrollspy');
const $ = require('jquery');

$('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 40
});

$('.bs-docs-sidebar')
.append('<ul class="nav nav-stacked fixed"/>')

$('h2')
.each((index, section) => {
	const sectionName = section.innerText;
	const sectionId = sectionName.replace(' ', '_');
	$(section).attr("id", sectionId);

	$('.bs-docs-sidebar > ul')
	.append(
		`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#${sectionId}">${sectionName}</a>
			<ul class="dropdown-menu"/>
		</li>
		`);

	const dropdownMenu = $('.bs-docs-sidebar .dropdown-menu').get(index);

	$(section)
	.nextUntil('h2', 'h3')
	.each((index, subSection) => {
		const subSectionName = subSection.innerText;
		const subSectionId = `${sectionId}_${subSectionName.replace(' ', '_')}`;
		$(subSection).attr("id", subSectionId);
		
		$(dropdownMenu).append(
			`<li>
				<a class="dropdown-item" href="#${subSectionId}">${subSectionName}</a>
			</li>
			`
			);
	});
});

/*
<ul class="nav nav-stacked fixed">  
	<li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle" href="#Invasion">Invasion</a>
		<ul class="dropdown-menu">
			<li>
				<a class="dropdown-item" href="#Invasion_1">Invasion 1</a>
			</li>
			<li>
				<a class="dropdown-item" href="#Invasion_2">Invasion 2</a>
			</li>
		</ul>
	</li>
	<li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle" href="#Commando">Commando</a>
		<ul class="dropdown-menu">
			<li>
				<a class="dropdown-item" href="#Commando_1">Commando 1</a>
			</li>
			<li>
				<a class="dropdown-item" href="#Commando_2">Commando 2</a>
			</li>
		</ul>
	</li>
</ul>
*/