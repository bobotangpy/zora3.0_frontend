const calculateHoroscope = (month, day) => {
    let horoscope;

    if (month && day) {
    
        // Calculate user's horoscope using DoB selected in signup
        if (month == 1 && day >= 20 || month == 2 && day <= 18) {
          horoscope = 'Aquarius';
        }
    
        if (month == 2 && day >= 19 || month == 3 && day <= 20) {
          horoscope = 'Pisces';
        }
    
        if (month == 3 && day >= 21 || month == 4 && day <= 19) {
          horoscope = 'Aries';
        }
    
        if (month == 4 && day >= 20 || month == 5 && day <= 20) {
          horoscope = 'Taurus';
        }
    
        if (month == 5 && day >= 21 || month == 6 && day <= 21) {
          horoscope = 'Gemini';
        }
    
        if (month == 6 && day >= 22 || month == 7 && day <= 22) {
          horoscope = 'Cancer';
        }
    
        if (month == 7 && day >= 23 || month == 8 && day <= 22) {
          horoscope = 'Leo';
        }
    
        if (month == 8 && day >= 23 || month == 9 && day <= 22) {
          horoscope = 'Virgo';
        }
    
        if (month == 9 && day >= 23 || month == 10 && day <= 22) {
          horoscope = 'Libra';
        }
    
        if (month == 10 && day >= 23 || month == 11 && day <= 21) {
          horoscope = 'Scorpio';
        }
    
        if (month == 11 && day >= 22 || month == 12 && day <= 21) {
          horoscope = 'Sagittarius';
        }
    
        if (month == 12 && day >= 22 || month == 1 && day <= 19) {
          horoscope = 'Capricorn';
        }
    
        return horoscope;
    }    
}

export default calculateHoroscope;