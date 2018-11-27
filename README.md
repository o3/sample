An example N2O Project
======================

Benchmarks
----------
Here are some benchmark results.
CPU    : Intel(R) Core(TM) i5 CPU       M 520  @ 2.40GHz
RAM    : 3901 Мб (1458 Мб занято)
OS     : Ubuntu 18.04.1 LTS
GHC    : 8.4.3
Erlang : 10

### Haskell version
```bash
$ tcpkali -T20s -r 10000 -c 50 --first-message "N2O," -m PING --ws 127.0.0.1:3000/ws/static/index.html
Destination: [127.0.0.1]:3000
Interface lo address [127.0.0.1]:0
Using interface lo to connect to [127.0.0.1]:3000
Ramped up to 50 connections.
Total data sent:     95.5 MiB (100175973 bytes)
Total data received: 28.3 MiB (29665440 bytes)
Bandwidth per channel: 1.038⇅ Mbps (129.8 kBps)
Aggregate bandwidth: 11.862↓, 40.055↑ Mbps
Packet rate estimate: 23925.7↓, 40424.5↑ (1↓, 1↑ TCP MSS/op)
Test duration: 20.0078 s.
```

### Erlang version
```bash
$ tcpkali -T20s -r 10000 -c 50 —first-message "N2O," -m PING —ws 127.0.0.1:8001/ws/app/login.htm
Destination: [127.0.0.1]:8001
Interface lo address [127.0.0.1]:0
Using interface lo to connect to [127.0.0.1]:8001
Ramped up to 50 connections.
Total data sent:     93.1 MiB (97666719 bytes)
Total data received: 2.9 MiB (2991708 bytes)
Bandwidth per channel: 0.805⇅ Mbps (100.6 kBps)
Aggregate bandwidth: 1.196↓, 39.059↑ Mbps
Packet rate estimate: 22393.7↓, 33294.2↑ (1↓, 1↑ TCP MSS/op)
Test duration: 20.0042 s.
```
