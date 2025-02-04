import datetime

def is_public_or_mercantile_holiday(date: datetime.date) -> tuple:
    holidays = {
        datetime.date(date.year, 1, 1): "New Year's Day",
        datetime.date(date.year, 2, 4): "Independence Day",
        datetime.date(date.year, 2, 14): "Valentine's Day 💘 (Developer is Out Searching for his Valentine 😢)",
        datetime.date(date.year, 2, 15): "Day after Valentine's Day 💔 (Developer Still Crying Over Unfound Love 😭)",
        datetime.date(date.year, 5, 1): "Labour Day",
        datetime.date(date.year, 12, 25): "Christmas Day",
        datetime.date(date.year, 12, 26): "Day after Christmas",
        datetime.date(date.year, 4, 13): "Sinhala and Tamil New Year",
        datetime.date(date.year, 4, 14): "Sinhala and Tamil New Year",
        datetime.date(date.year, 5, 5): "Vesak Full Moon Poya Day",
        datetime.date(date.year, 6, 3): "Poson Full Moon Poya Day",
        datetime.date(date.year, 7, 3): "Esala Full Moon Poya Day",
        datetime.date(date.year, 8, 1): "Nikini Full Moon Poya Day",
        datetime.date(date.year, 9, 29): "Binara Full Moon Poya Day",
        datetime.date(date.year, 10, 28): "Vap Full Moon Poya Day",
        datetime.date(date.year, 11, 26): "Il Full Moon Poya Day",
        datetime.date(date.year, 12, 25): "Unduvap Full Moon Poya Day",
    }
    
    if date in holidays:
        return True, holidays[date]
    return False, None
