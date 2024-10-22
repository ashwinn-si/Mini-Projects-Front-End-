import numpy as np
from sklearn.linear_model import LinearRegression
import json

predicted_values = []

# Encoding locations as numeric values
def encode_location(location):
    locations = ['chennai', 'madurai', 'trichy', 'kancheepuram']
    return locations.index(location)

# Generate synthetic data
def generate_synthetic_data(num_samples, location_index, location_bedroom_price, location_sqft_price, location_age_price):
    data = []

    for _ in range(num_samples):
        bedrooms = np.random.randint(1, 11)  # Number of bedrooms between 1 and 10
        square_feet = np.random.randint(200, 1001)  # Square footage between 200 and 1000
        building_age = np.random.randint(1, 11)  # Building age between 1 and 10 years

        # Simulated price based on input factors + random noise
        price = (bedrooms * location_bedroom_price) + (square_feet * location_sqft_price) - (building_age * location_age_price) + (np.random.uniform(-10000, 10000))
        
        data.append([bedrooms, square_feet, building_age, price])

    return data

# Train model and predict future prices
def train_model(location, sqft, no_bedroom, build_age):
    if location == 'chennai':
        data = generate_synthetic_data(10, 0, 5000, 3500, 10000)
        curr_price = (no_bedroom * 5000) + (sqft * 3500) - (build_age * 10000)
    elif location == 'madurai':
        data = generate_synthetic_data(10, 1, 3000, 1500, 7000)
        curr_price = (no_bedroom * 3000) + (sqft * 1500) - (build_age * 7000)
    elif location == 'trichy':
        data = generate_synthetic_data(10, 2, 3000, 1500, 7000)
        curr_price = (no_bedroom * 3000) + (sqft * 1500) - (build_age * 7000)
    else:
        data = generate_synthetic_data(10, 3, 3000, 1500, 7000)
        curr_price = (no_bedroom * 3000) + (sqft * 1500) - (build_age * 7000)

    predicted_values.append(curr_price)

    # Prepare dataset for regression
    X = np.array([d[1] for d in data]).reshape(-1, 1)  # Square footage as the predictor
    y = np.array([d[3] for d in data])  # Price as the target

    # Linear Regression model
    model = LinearRegression()
    model.fit(X, y)

    # Predict future prices
    for i in range(1, 11):
        future_year = 2024 + i
        # Add a random fluctuation to simulate unpredictability
        random_fluctuation = (np.random.rand() - 0.5) * 0.1  # Random value between -5% and +5%
        future_price = model.predict([[sqft]])[0] * (1 + random_fluctuation)
        predicted_values.append(round(future_price))

    # Store the predicted values in a file or use them further in your program
    with open('predicted_values.json', 'w') as f:
        json.dump(predicted_values, f)

    return predicted_values

# Example usage
predicted = train_model('chennai', 850, 3, 5)
print(predicted)
