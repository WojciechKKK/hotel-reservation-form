// Global form config - values can by edited by user


// validation config - provided by business requirements
const ADDITIONAL_VALIDATION_OPTIONS = {
	city: { 
		required: true 
	},
	hotel: { 
		required: false 
	},
	['check-in-date']: { 
		required: true,
		errorText: 'Data zameldowania nie może być wcześniejsza niż dziś'
	},
	['check-out-date']: { 
		required: true,
		minimumDays: 1,
		errorText: 'Data wymeldownia nie może być wcześniejsza niż zameldowania'
	},
	visitors: { 
		required: true,
		min: 1,
		max: 9,
		errorTextForMin: 'Minimalna liczba gości to 1',
		errorTextForMax: 'Maksymalna liczba gości to 9',
	},
	name: { required: true },
	email: { 
		required: true,
		errorText: 'Adres e-mail jest nieprawidłowy'
	},
	phone: { 
		required: false,
		errorText: 'Prawidłowy format: xxx-xxx-xxx'
	},
	comment: { 
		required: false,
		max: 250,
		errorText: 'Maksymalna ilośc znaków to 250'
	},
}

// random hotels for dedicated cirty
const AVAILABLE_HOTELS = {
  warszawa: ['Raffless', 'Bristol', 'InterContinental', 'Hotele Verte', 'Nubu'],
  krakow: ['Amber', 'Wyndham Grand', 'Balthazar', 'H15 Palace', 'Hyatt'],
  gdansk: ['Puro', 'Mercure', 'Arche', 'Fama', 'Grano'],
  szczecin: ['Radisson', 'Grand', 'Dana', 'Silver', 'Novotel'],
  wroclaw: ['Altus', 'The Bridge', 'Monopol', 'Double Tree', 'Marina'],
  katowice: ['Qubus', 'Diament', 'Courtyard', 'Szafran', 'Hotel M23']
}

const REQUIRED_FIELD_VALIDATION_TEXT = 'Pole jest wymagane';

export { ADDITIONAL_VALIDATION_OPTIONS as VALIDATIONS, AVAILABLE_HOTELS as HOTELS, REQUIRED_FIELD_VALIDATION_TEXT as VALIDATION_ERROR }