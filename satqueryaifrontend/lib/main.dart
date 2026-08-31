import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Django + Flutter',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Django + Flutter Integration'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _message = "Press the button to fetch data from Django";

  Future<void> _fetchData() async {
    try {
      final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/hello/'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _message = data['message'];
        });
      } else {
        setState(() {
          _message = "Error: \${response.statusCode}";
        });
      }
    } catch (e) {
      setState(() {
        _message = "Failed to connect to backend: \$e";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Message from backend:',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 20),
              Text(
                _message,
                style: Theme.of(context).textTheme.titleLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: _fetchData,
                child: const Text('Fetch Data'),
              )
            ],
          ),
        ),
      ),
    );
  }
}

