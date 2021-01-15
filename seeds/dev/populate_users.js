
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
		.then(function () {
	    	// Inserts seed entries
			return knex('users').insert([
				{
					name: 'Alicia D. Macomber', 
					email: 'AliciaDMacomber@rhyta.com', 
					password: 'mypassword',
					phone_number: '856-672-5718',
					address: '4892 Prospect Street',
					city: 'Haddonfield',
					state: 'NJ',
					zip: '08033'
				},
				{
					name: 'David M. Motley', 
					email: 'DavidMMotley@teleworm.us', 
					password: 'mypassword',
					phone_number: '213-333-0527',
					address: '4038 Brannon Street',
					city: 'Los Angeles',
					state: 'CA',
					zip: '90071'
				},				
			]);
	});
};
