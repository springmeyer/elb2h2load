# elb2h2load

Convert elg logs to input format for h2load


## Install

```
npm install
```

## Usage

```
node index.js input-log > output-log
```

Then put some load on your server:

```
h2load --h1 --base-uri=http://localhost:8889 --input-file=output-log --duration=50 -c100 -m100
```

Note: to get `h2load` command run `brew install nghttp2`.
