# Tiny Logger for nodejs

一个简单的Logger小模块，供自己用着方便，只是临时使用，等有时间再完善。

## 用法
``` javascript
var tLogger = require('tLogger');
var logger = new tLogger('path to log file', multifile);
logger.warn('warning str');
logger.error('error str');
logger.info('info str');
logger.notice('notice str');
```
