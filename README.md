# 🧮 Android Calculator App

A simple yet functional Android calculator application built with Kotlin, supporting basic arithmetic and expression evaluation. The project is well-structured, uses modern dependency management, and is suitable for learning and testing purposes.

## 📁 Project Structure

```
app/
├── manifests/
├── kotlin+java/
│   └── com.example.calc/
│       ├── CalculatorFunctions.kt ✅
│       ├── Formulautil.kt
│       └── MainActivity.kt
├── com.example.calc (androidTest)/
│   └── ExampleInstrumentedTest.kt
├── com.example.calc (test)/
│   └── ExampleUnitTest.kt
└── res/
    ├── drawable/
    ├── layout/
    │   ├── activity_main.xml
    │   └── activity_main.xml (land)  # Landscape layout
```

## 🛠 Tech Stack

- **Language**: Kotlin  
- **Min SDK**: 26  
- **Target SDK**: 35  
- **Build Tool**: Gradle (KTS)  
- **Testing**: JUnit, Espresso, Mockito, Hamcrest

## 📦 Dependencies

The project uses **Version Catalogs** (`libs.versions.toml`) for dependency management. Key dependencies include:

- `androidx.core.ktx`
- `androidx.appcompat`
- `androidx.constraintlayout`
- `com.google.android.material`
- `androidx.activity`
- `androidx.gridlayout`
- Testing: `junit`, `espresso-core`, `espresso-contrib`, `mockito-core`, `hamcrest`

## 🧪 Testing

Both unit tests and instrumentation tests are implemented:

```kotlin
testImplementation(libs.junit)
androidTestImplementation(libs.androidx.junit)
androidTestImplementation(libs.androidx.espresso.core)
androidTestImplementation(libs.androidx.espresso.contrib)
testImplementation(libs.mockito.core)
testImplementation(libs.hamcrest.library)
```

## 📱 Runtime Environment

- **Development Environment**: Android Studio  
- **Emulator**: **Pixel 9 Pro XL** (API 35)  
- **Compile SDK**: 35  
- **Java Version**: 11

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calc.git
   ```
2. Open the project in Android Studio
3. Select the **Pixel 9 Pro XL** emulator or connect a physical device
4. Click the Run button (▶️) or execute:
   ```bash
   ./gradlew installDebug
   ```
