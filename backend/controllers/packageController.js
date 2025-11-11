// In-memory storage for hotel packages
let packages = [
  {
    id: 1,
    name: "Paris Luxury Hotel",
    price: 1299,
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    rating: 4.8,
    description: "Experience the romance and elegance of Paris in our luxurious 5-star hotel. Located in the heart of the city, enjoy stunning views of the Eiffel Tower and world-class amenities.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness", "Restaurant", "Bar", "Room Service"]
  },
  {
    id: 2,
    name: "Bali Beach Resort",
    price: 899,
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    rating: 4.7,
    description: "Escape to paradise at our stunning beachfront resort in Bali. Enjoy crystal-clear waters, white sandy beaches, and traditional Balinese hospitality.",
    amenities: ["Free WiFi", "Private Beach", "Infinity Pool", "Spa", "Water Sports", "Beach Bar"]
  },
  {
    id: 3,
    name: "Tokyo Business Hotel",
    price: 1099,
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    rating: 4.6,
    description: "Modern business hotel in the heart of Tokyo's business district. Perfect blend of Japanese efficiency and international comfort with state-of-the-art facilities.",
    amenities: ["Free WiFi", "Business Center", "Fitness Center", "Restaurant", "Meeting Rooms", "Airport Shuttle"]
  },
  {
    id: 4,
    name: "Dubai Premium Suite",
    price: 1599,
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    rating: 4.9,
    description: "Indulge in ultimate luxury at our premium suite hotel in Dubai. Experience breathtaking views, opulent interiors, and world-renowned service in the city of gold.",
    amenities: ["Free WiFi", "Private Pool", "Butler Service", "Spa", "Fine Dining", "Helipad Access"]
  },
  {
    id: 5,
    name: "New York City Hotel",
    price: 1199,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop",
    rating: 4.7,
    description: "Stay in the city that never sleeps at our iconic Manhattan hotel. Steps away from Times Square, Broadway theaters, and world-famous landmarks.",
    amenities: ["Free WiFi", "Rooftop Bar", "Fitness Center", "Concierge Service", "Restaurant", "City Tours"]
  },
  {
    id: 6,
    name: "London Historic Hotel",
    price: 1399,
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    rating: 4.8,
    description: "Experience British elegance in our historic Victorian hotel. Rich heritage meets modern luxury in the heart of London, near Buckingham Palace and Big Ben.",
    amenities: ["Free WiFi", "Afternoon Tea", "Spa", "Fine Dining", "Concierge", "Heritage Tours"]
  }
];

// Get all packages
const getAllPackages = (req, res) => {
  try {
    // Filter by location if provided
    const { location, minPrice, maxPrice, minRating } = req.query;
    
    let filteredPackages = [...packages];
    
    if (location) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= parseFloat(maxPrice));
    }
    
    if (minRating) {
      filteredPackages = filteredPackages.filter(pkg => pkg.rating >= parseFloat(minRating));
    }
    
    res.status(200).json({
      success: true,
      count: filteredPackages.length,
      data: filteredPackages
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message
    });
  }
};

// Get single package by ID
const getPackageById = (req, res) => {
  try {
    const packageId = parseInt(req.params.id);
    const package = packages.find(pkg => pkg.id === packageId);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: package
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: error.message
    });
  }
};

module.exports = {
  getAllPackages,
  getPackageById
};
